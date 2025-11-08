/**
 * 文件操作服务
 */

import { App, Notice, TFile } from "obsidian";
import { ImageItem } from "../types/image-manager.types";

export class FileOperationService {
	constructor(private app: App) {}

	/**
	 * 打开文件
	 */
	async openFile(image: ImageItem): Promise<void> {
		const targetFile = image.isAgx
			? image.originalFile
			: image.displayFile;
		if (targetFile) {
			// 在新标签页中打开图片
			const leaf = this.app.workspace.getLeaf('tab');
			await leaf.openFile(targetFile);
		}
	}

	/**
	 * 重命名文件
	 */
	async renameFile(image: ImageItem, newName: string): Promise<void> {
		try {
			const newPath = image.path.replace(/[^\/]+$/, newName);
			await this.app.fileManager.renameFile(
				image.originalFile,
				newPath
			);

			// 如果是AGX文件，同时重命名对应的SVG文件
			if (image.isAgx) {
				const svgPath = image.path.replace(/\.agx$/i, ".svg");
				const svgFile =
					this.app.vault.getAbstractFileByPath(svgPath);
				if (svgFile instanceof TFile) {
					const newSvgPath = newPath.replace(/\.agx$/i, ".svg");
					await this.app.fileManager.renameFile(svgFile, newSvgPath);
				}
			}

			new Notice("文件重命名成功");
		} catch (error) {
			new Notice(`重命名失败: ${error.message}`);
			throw error;
		}
	}

	/**
	 * 删除文件
	 */
	async deleteFile(image: ImageItem, confirmDelete = true): Promise<void> {
		// 确认删除
		if (confirmDelete) {
			const message = `确定要删除文件 "${image.name}" 吗？${
				image.isAgx ? "（同时会删除对应的SVG文件）" : ""
			}`;
			const confirmed = confirm(message);
			if (!confirmed) return;
		}

		try {
			await this.app.vault.trash(image.originalFile, false);

			// 如果是AGX文件，同时删除对应的SVG文件
			if (image.isAgx) {
				const svgPath = image.path.replace(/\.agx$/i, ".svg");
				const svgFile =
					this.app.vault.getAbstractFileByPath(svgPath);
				if (svgFile instanceof TFile) {
					await this.app.vault.trash(svgFile, false);
				}
			}

			new Notice("文件删除成功");
		} catch (error) {
			new Notice(`删除失败: ${error.message}`);
			throw error;
		}
	}

	/**
	 * 打开引用文件
	 */
	async openReferenceFile(filePath: string): Promise<void> {
		const file = this.app.vault.getAbstractFileByPath(filePath);
		if (file instanceof TFile) {
			await this.app.workspace.openLinkText(filePath, "");
		}
	}
}
