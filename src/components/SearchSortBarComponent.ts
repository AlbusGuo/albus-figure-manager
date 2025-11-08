/**
 * 搜索和排序栏组件
 */

import { SortOrder } from "../types/image-manager.types";

export class SearchSortBarComponent {
	private containerEl: HTMLElement;
	private searchInput: HTMLInputElement;
	private sortSelect: HTMLSelectElement;
	private onSearchChange?: (query: string) => void;
	private onSortChange?: (order: SortOrder) => void;

	constructor(containerEl: HTMLElement) {
		this.containerEl = containerEl;
		this.render();
	}

	/**
	 * 设置事件处理器
	 */
	setEventHandlers(handlers: {
		onSearchChange?: (query: string) => void;
		onSortChange?: (order: SortOrder) => void;
	}): void {
		this.onSearchChange = handlers.onSearchChange;
		this.onSortChange = handlers.onSortChange;
	}

	/**
	 * 渲染组件
	 */
	private render(): void {
		this.containerEl.addClass("image-manager-search-sort-bar");

		// 搜索框
		const searchBox = this.containerEl.createDiv({
			cls: "image-manager-search-box",
		});

		this.searchInput = searchBox.createEl("input", {
			cls: "image-manager-search-input",
			attr: {
				type: "text",
				placeholder: "搜索图片名称或路径...",
			},
		});

		this.searchInput.addEventListener("input", () => {
			this.onSearchChange?.(this.searchInput.value);
		});

		// 清除按钮
		const clearBtn = searchBox.createEl("button", {
			cls: "image-manager-clear-search-button",
			text: "✕",
			attr: { title: "清除搜索" },
		});

		clearBtn.addEventListener("click", () => {
			this.searchInput.value = "";
			this.onSearchChange?.("");
		});

		// 排序控制
		const sortControls = this.containerEl.createDiv({
			cls: "image-manager-sort-controls",
		});

		sortControls.createEl("label", {
			cls: "image-manager-sort-label",
			text: "排序:",
		});

		this.sortSelect = sortControls.createEl("select", {
			cls: "image-manager-sort-select",
		});

		this.sortSelect.createEl("option", {
			value: "desc",
			text: "从新到旧",
		});

		this.sortSelect.createEl("option", {
			value: "asc",
			text: "从旧到新",
		});

		this.sortSelect.addEventListener("change", () => {
			this.onSortChange?.(this.sortSelect.value as SortOrder);
		});
	}

	/**
	 * 获取搜索查询
	 */
	getSearchQuery(): string {
		return this.searchInput.value;
	}

	/**
	 * 设置搜索查询
	 */
	setSearchQuery(query: string): void {
		this.searchInput.value = query;
	}

	/**
	 * 获取排序顺序
	 */
	getSortOrder(): SortOrder {
		return this.sortSelect.value as SortOrder;
	}

	/**
	 * 设置排序顺序
	 */
	setSortOrder(order: SortOrder): void {
		this.sortSelect.value = order;
	}
}
