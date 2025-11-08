/**
 * 头部组件
 */

export class HeaderComponent {
	private containerEl: HTMLElement;
	private statsEl: HTMLElement;
	private onCheckReferences?: () => void;
	private onToggleUnreferencedFilter?: () => void;

	constructor(containerEl: HTMLElement) {
		this.containerEl = containerEl;
		this.render();
	}

	/**
	 * 设置事件处理器
	 */
	setEventHandlers(handlers: {
		onCheckReferences?: () => void;
		onToggleUnreferencedFilter?: () => void;
	}): void {
		this.onCheckReferences = handlers.onCheckReferences;
		this.onToggleUnreferencedFilter = handlers.onToggleUnreferencedFilter;
	}

	/**
	 * 渲染组件
	 */
	private render(): void {
		this.containerEl.addClass("image-manager-header");

		// 统计信息
		const actionsEl = this.containerEl.createDiv({
			cls: "image-manager-header-actions",
		});

		this.statsEl = actionsEl.createDiv({
			cls: "image-manager-stats",
		});

		// 引用操作按钮
		const referenceActions = actionsEl.createDiv({
			cls: "image-manager-reference-actions",
		});

		// 检查引用按钮
		const checkRefsBtn = referenceActions.createEl("button", {
			cls: "image-manager-check-refs-button",
			text: "🔍 检查引用",
		});

		checkRefsBtn.addEventListener("click", () => {
			this.onCheckReferences?.();
		});

		// 筛选未引用按钮
		const filterBtn = referenceActions.createEl("button", {
			cls: "image-manager-filter-button",
			text: "🔗 仅未引用",
		});

		filterBtn.addEventListener("click", () => {
			this.onToggleUnreferencedFilter?.();
			filterBtn.toggleClass(
				"image-manager-filter-button-active",
				filterBtn.hasClass("image-manager-filter-button-active")
			);
		});
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
}
