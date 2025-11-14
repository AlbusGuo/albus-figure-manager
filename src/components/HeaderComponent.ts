/**
 * 头部组件
 */

import { App, setIcon } from "obsidian";
import { FolderSuggest } from "./FolderSuggest";

export class HeaderComponent {
	private containerEl: HTMLElement;
	private statsEl: HTMLElement;
	private folderBtn?: HTMLElement;
	private folderSuggest?: FolderSuggest;
	private app?: App;
	private currentFolder = "";
	private showUnreferencedOnly = false;
	private onCheckReferences?: () => void;
	private onToggleUnreferencedFilter?: () => void;
	private onFolderChange?: (folder: string) => void;

	constructor(containerEl: HTMLElement, showFolderSelector = false, app?: App) {
		this.containerEl = containerEl;
		this.app = app;
		this.render(showFolderSelector);
	}

	/**
	 * 设置事件处理器
	 */
	setEventHandlers(handlers: {
		onCheckReferences?: () => void;
		onToggleUnreferencedFilter?: () => void;
		onFolderChange?: (folder: string) => void;
	}): void {
		this.onCheckReferences = handlers.onCheckReferences;
		this.onToggleUnreferencedFilter = handlers.onToggleUnreferencedFilter;
		this.onFolderChange = handlers.onFolderChange;
	}

	/**
	 * 渲染组件
	 */
	private render(showFolderSelector: boolean): void {
		this.containerEl.addClass("image-manager-header");

		// 单行布局
		const headerRow = this.containerEl.createDiv("image-manager-header-row");

		// 左侧：文件夹按钮 + 统计
		const leftSection = headerRow.createDiv("image-manager-header-left");

		// 文件夹选择器（可选）
		if (showFolderSelector && this.app) {
			this.renderFolderButton(leftSection);
		}

		// 统计信息
		this.statsEl = leftSection.createDiv("image-manager-stats");

		// 右侧：操作按钮
		const rightSection = headerRow.createDiv("image-manager-header-right");

		// 筛选未引用按钮
		const filterBtn = rightSection.createEl("button", {
			cls: "image-manager-filter-button",
			text: "仅未引用",
		});

		filterBtn.addEventListener("click", () => {
			this.showUnreferencedOnly = !this.showUnreferencedOnly;
			this.onToggleUnreferencedFilter?.();
			filterBtn.toggleClass("image-manager-filter-button-active", this.showUnreferencedOnly);
		});

		// 检查引用按钮
		const checkRefsBtn = rightSection.createEl("button", {
			cls: "image-manager-check-refs-button",
			text: "检查引用",
		});

		checkRefsBtn.addEventListener("click", () => {
			this.onCheckReferences?.();
		});
	}

	/**
	 * 渲染文件夹按钮
	 */
	private renderFolderButton(container: HTMLElement): void {
		this.folderBtn = container.createEl("button", {
			cls: "image-manager-folder-button",
		});
		
		const folderIcon = this.folderBtn.createSpan({ cls: "image-manager-folder-icon" });
		setIcon(folderIcon, "folder");
		
		const folderText = this.folderBtn.createSpan({ 
			text: this.currentFolder || "所有图片",
			cls: "image-manager-folder-text"
		});

		// 点击按钮显示输入框
		this.folderBtn.addEventListener("click", () => {
			this.showFolderInput();
		});
	}

	/**
	 * 显示文件夹输入框
	 */
	private showFolderInput(): void {
		if (!this.folderBtn || !this.app) return;

		// 创建输入框容器
		const inputContainer = this.folderBtn.parentElement!.createDiv("image-manager-folder-input-container");
		
		const folderInput = inputContainer.createEl("input", {
			type: "text",
			placeholder: "输入文件夹路径...",
			value: this.currentFolder,
			cls: "image-manager-folder-input-inline",
		});

		// 隐藏按钮
		this.folderBtn.style.display = "none";

		// 创建FolderSuggest
		if (this.folderSuggest) {
			this.folderSuggest.destroy();
		}
		this.folderSuggest = new FolderSuggest(this.app, folderInput, (value) => {
			this.currentFolder = value;
			this.onFolderChange?.(value);
			this.updateFolderButtonText();
		});

		// 输入事件
		folderInput.addEventListener("input", () => {
			this.currentFolder = folderInput.value;
		});

		// 回车键确认
		folderInput.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				this.onFolderChange?.(this.currentFolder);
				this.updateFolderButtonText();
				inputContainer.remove();
				this.folderBtn!.style.display = "";
			} else if (e.key === "Escape") {
				inputContainer.remove();
				this.folderBtn!.style.display = "";
			}
		});

		// 失焦时隐藏输入框
		folderInput.addEventListener("blur", () => {
			setTimeout(() => {
				inputContainer.remove();
				this.folderBtn!.style.display = "";
			}, 200);
		});

		// 自动聚焦
		setTimeout(() => folderInput.focus(), 0);
	}

	/**
	 * 更新文件夹按钮文字
	 */
	private updateFolderButtonText(): void {
		if (this.folderBtn) {
			const textSpan = this.folderBtn.querySelector(".image-manager-folder-text");
			if (textSpan) {
				textSpan.textContent = this.currentFolder || "所有图片";
			}
		}
	}

	/**
	 * 渲染文件夹选择器（旧方法，保留兼容性）
	 */
	private renderFolderSelector(): void {
		// 已废弃，使用 renderFolderButton 替代
	}

	/**
	 * 更新统计信息
	 */
	updateStats(
		total: number,
		filtered: number,
		unreferenced?: number
	): void {
		let text = `共 ${total} 张图片`;

		if (filtered !== total) {
			text += ` (显示 ${filtered} 张)`;
		}

		if (unreferenced !== undefined) {
			text += ` · ${unreferenced} 张未引用`;
		}

		this.statsEl.setText(text);
	}

	/**
	 * 设置按钮状态
	 */
	setCheckingState(isChecking: boolean): void {
		const btn = this.containerEl.querySelector(
			".image-manager-check-refs-button"
		) as HTMLButtonElement;
		if (btn) {
			btn.disabled = isChecking;
			btn.setText(isChecking ? "⏳ 检查中..." : "🔍 检查引用");
		}
	}

	/**
	 * 设置筛选按钮状态
	 */
	setFilterButtonActive(active: boolean): void {
		const btn = this.containerEl.querySelector(
			".image-manager-filter-button"
		) as HTMLButtonElement;
		if (btn) {
			btn.toggleClass("image-manager-filter-button-active", active);
		}
	}

	/**
	 * 设置文件夹输入框的值
	 */
	setFolderValue(folder: string): void {
		this.currentFolder = folder;
		this.updateFolderButtonText();
	}

	/**
	 * 获取文件夹输入框的值
	 */
	getFolderValue(): string {
		return this.currentFolder;
	}

	/**
	 * 销毁组件
	 */
	destroy(): void {
		if (this.folderSuggest) {
			this.folderSuggest.destroy();
		}
	}
}
