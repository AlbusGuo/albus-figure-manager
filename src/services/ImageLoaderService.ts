/**
 * 图片加载服务
 */

import { App, TFile } from "obsidian";
import {
	ImageItem,
	SUPPORTED_IMAGE_EXTENSIONS,
	SortOrder,
} from "../types/image-manager.types";

export class ImageLoaderService {
	constructor(private app: App) {}

	/**
	 * 加载指定文件夹下的图片
	 */
	async loadImages(
		folderPath: string,
		sortOrder: SortOrder = "desc"
	): Promise<ImageItem[]> {
		const allFiles = this.app.vault.getFiles();

		// 找出所有AGX文件及其对应的SVG文件
		const agxFiles = allFiles.filter(
			(file) => file.extension.toLowerCase() === "agx"
		);

		const usedSvgPaths = new Set<string>();
		agxFiles.forEach((agxFile) => {
			const svgPath = agxFile.path.replace(/\.agx$/i, ".svg");
			usedSvgPaths.add(svgPath);
		});

		// 筛选图片文件
		const imageFiles = allFiles.filter((file) => {
			// 文件夹筛选逻辑
			let inFolder = true;
			if (folderPath && folderPath.trim() !== "") {
				inFolder =
					file.path.startsWith(folderPath + "/") ||
					file.path === folderPath;
			}

			// 文件类型筛选
			const extension = file.extension.toLowerCase();
			const isImage = SUPPORTED_IMAGE_EXTENSIONS.includes(
				extension as any
			);

			// 如果是SVG文件且已被AGX使用，则跳过
			if (extension === "svg" && usedSvgPaths.has(file.path)) {
				return false;
			}

			return inFolder && isImage;
		});

		// 处理AGX文件的SVG封面
		const processedImages = await Promise.all(
			imageFiles.map((file) => this.processImageFile(file))
		);

		// 按创建时间排序
		const sortedImages = processedImages.sort((a, b) => {
			const timeA = a.stat.ctime;
			const timeB = b.stat.ctime;
			return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
		});

		return sortedImages;
	}

	/**
	 * 处理单个图片文件
	 */
	private async processImageFile(file: TFile): Promise<ImageItem> {
		const isAgx = file.extension.toLowerCase() === "agx";
		let displayFile = file;

		// 对于AGX文件，尝试找到对应的SVG文件
		if (isAgx) {
			const svgPath = file.path.replace(/\.agx$/i, ".svg");
			const svgFile = this.app.vault.getAbstractFileByPath(svgPath);
			if (svgFile instanceof TFile) {
				displayFile = svgFile;
			}
		}

		return {
			name: file.name,
			path: file.path,
			originalFile: file,
			displayFile: displayFile,
			isAgx: isAgx,
			stat: {
				ctime: file.stat.ctime,
				mtime: file.stat.mtime,
				size: file.stat.size,
			},
		};
	}

	/**
	 * 获取图片的资源URL
	 */
	getImageResourcePath(file: TFile): string {
		return this.app.vault.getResourcePath(file);
	}
}
