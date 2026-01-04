/**
 * 图片网格组件
 */

import { setIcon } from "obsidian";
import { ImageItem } from "../types/image-manager.types";

export class ImageGridComponent {
	private containerEl: HTMLElement;
	private onImageClick?: (image: ImageItem) => void;
	private onImageDoubleClick?: (image: ImageItem) => void;
	private onOpenClick?: (image: ImageItem) => void;
	private onRenameClick?: (image: ImageItem) => void;
	private onDeleteClick?: (image: ImageItem) => void;
	private intersectionObserver: IntersectionObserver | null = null;

	constructor(containerEl: HTMLElement) {
		this.containerEl = containerEl;
		this.initIntersectionObserver();
	}

	/**
	 * 初始化 IntersectionObserver 用于懒加载
	 */
	private initIntersectionObserver(): void {
		// 创建 IntersectionObserver 实例
		this.intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const imgEl = entry.target as HTMLImageElement;
						const dataSrc = imgEl.getAttribute("data-src");
						if (dataSrc && !imgEl.src) {
							// 开始加载图片
							imgEl.src = dataSrc;
							imgEl.removeAttribute("data-src");
							// 加载后停止观察
							this.intersectionObserver?.unobserve(imgEl);
						}
					}
				});
			},
			{
				// 提前 200px 开始加载
				rootMargin: "200px",
				threshold: 0.01,
			}
		);
	}

	/**
	 * 清理资源
	 */
	destroy(): void {
		if (this.intersectionObserver) {
			this.intersectionObserver.disconnect();
			this.intersectionObserver = null;
		}
	}

	/**
	 * 设置事件处理器
	 */
	setEventHandlers(handlers: {
		onImageClick?: (image: ImageItem) => void;
		onImageDoubleClick?: (image: ImageItem) => void;
		onOpenClick?: (image: ImageItem) => void;
		onRenameClick?: (image: ImageItem) => void;
		onDeleteClick?: (image: ImageItem) => void;
	}): void {
		this.onImageClick = handlers.onImageClick;
		this.onImageDoubleClick = handlers.onImageDoubleClick;
		this.onOpenClick = handlers.onOpenClick;
		this.onRenameClick = handlers.onRenameClick;
		this.onDeleteClick = handlers.onDeleteClick;
	}

	/**
	 * 渲染图片网格
	 */
	render(
		images: ImageItem[],
		getImagePath: (image: ImageItem) => string
	): void {
		// 先清理旧的观察器
		if (this.intersectionObserver) {
			this.intersectionObserver.disconnect();
		}

		this.containerEl.empty();

		if (images.length === 0) {
			this.renderEmptyState();
			return;
		}

		const gridEl = this.containerEl.createDiv("image-manager-grid");

		images.forEach((image) => {
			this.renderImageItem(gridEl, image, getImagePath);
		});
	}

	/**
	 * 渲染单个图片项
	 */
	private renderImageItem(
		gridEl: HTMLElement,
		image: ImageItem,
		getImagePath: (image: ImageItem) => string
	): void {
		const itemEl = gridEl.createDiv("image-manager-grid-item");

		// 点击事件
		itemEl.addEventListener("click", () => {
			this.onImageClick?.(image);
		});

		// 双击事件
		itemEl.addEventListener("dblclick", () => {
			this.onImageDoubleClick?.(image);
		});

		// 缩略图容器
		const thumbnailEl = itemEl.createDiv("image-manager-thumbnail");

		// 检查封面是否缺失
		if (image.coverMissing) {
			// 显示占位图标
			const placeholderDiv = thumbnailEl.createDiv("image-manager-cover-missing");
			const contentWrapper = placeholderDiv.createDiv("image-manager-cover-missing-content");
			const iconDiv = contentWrapper.createEl("span", { cls: "image-manager-cover-missing-icon" });
			setIcon(iconDiv, "file-x");
			contentWrapper.createEl("span", {
				text: "封面缺失",
				cls: "image-manager-cover-missing-text",
			});
		} else {
			// 图片
			const imgEl = thumbnailEl.createEl("img");
			imgEl.addClass("image-manager-thumbnail-image");
			const imagePath = getImagePath(image);
			
			// 懒加载：使用 data-src 而不是直接设置 src
			imgEl.setAttribute("data-src", imagePath);
			imgEl.alt = image.name;
			
			// 添加占位背景
			imgEl.style.backgroundColor = "var(--background-modifier-border)";
			imgEl.style.minHeight = "200px"; // 确保有最小高度以便观察器能检测到

			// SVG图片特殊处理 - 只有当显示的封面是 SVG 时才应用
			if (image.displayFile.extension.toLowerCase() === "svg") {
				imgEl.addClass("image-manager-svg-image");
			}

			// 将图片元素加入 IntersectionObserver
			if (this.intersectionObserver) {
				this.intersectionObserver.observe(imgEl);
			}

			// 添加加载错误处理，防止循环加载
			let loadFailed = false;
			imgEl.onerror = () => {
				if (loadFailed) return; // 防止重复处理
				loadFailed = true;
				console.warn(`图片加载失败: ${image.path}`);
				// 清空 src 防止持续尝试加载
				imgEl.src = "";
				imgEl.style.display = "none";
				// 显示错误占位符
				const errorDiv = thumbnailEl.createDiv("image-manager-cover-missing");
				const contentWrapper = errorDiv.createDiv("image-manager-cover-missing-content");
				const iconDiv = contentWrapper.createEl("span", { cls: "image-manager-cover-missing-icon" });
				setIcon(iconDiv, "alert-circle");
				contentWrapper.createEl("span", {
					text: "加载失败",
					cls: "image-manager-cover-missing-text",
				});
			};

			// 添加加载超时处理（10秒）
			const loadTimeout = setTimeout(() => {
				if (!imgEl.complete && !loadFailed) {
					console.warn(`图片加载超时: ${image.path}`);
					imgEl.onerror?.(new Event("error"));
				}
			}, 10000);

			// 加载成功时清除超时
			imgEl.onload = () => {
				clearTimeout(loadTimeout);
			};
		}

		// 格式标签
		const extension = image.originalFile.extension.toUpperCase();
		const formatBadgeEl = thumbnailEl.createDiv("image-manager-format-badge");
		formatBadgeEl.setText(extension);
		formatBadgeEl.addClass(
			image.isAgx || image.isCustomType
				? "image-manager-agx-format"
				: "image-manager-other-format"
		);

		// 引用标签
		if (image.referenceCount !== undefined && image.referenceCount > 0) {
			const refBadge = thumbnailEl.createDiv("image-manager-reference-badge");
			refBadge.setText(`${image.referenceCount}`);
		}

		// 信息区域
		const infoEl = itemEl.createDiv("image-manager-image-info");

		// 文件名
		const nameEl = infoEl.createDiv("image-manager-image-name");
		nameEl.setText(image.name);
		nameEl.title = image.name;

		// 元数据
		const metaEl = infoEl.createDiv("image-manager-image-meta");

		// 引用计数
		if (image.referenceCount !== undefined) {
			const refCount = metaEl.createDiv("image-manager-reference-count");
			refCount.setText(`引用: ${image.referenceCount}`);
		}

		// 创建时间
		const createTime = new Date(image.stat.ctime).toLocaleDateString("zh-CN");
		const timeEl = metaEl.createDiv("image-manager-create-time");
		timeEl.setText(createTime);

		// 操作按钮
		const actionsEl = infoEl.createDiv("image-manager-image-actions");

		// 打开按钮
		const openBtn = actionsEl.createEl("button");
		openBtn.addClass("image-manager-action-button", "image-manager-open-button");
		openBtn.setText("📂");
		openBtn.title = "打开文件";
		openBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.onOpenClick?.(image);
		});

		// 重命名按钮
		const renameBtn = actionsEl.createEl("button");
		renameBtn.addClass("image-manager-action-button", "image-manager-rename-button");
		renameBtn.setText("✏️");
		renameBtn.title = "重命名";
		renameBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.onRenameClick?.(image);
		});

		// 删除按钮
		const deleteBtn = actionsEl.createEl("button");
		deleteBtn.addClass("image-manager-action-button", "image-manager-delete-button");
		deleteBtn.setText("🗑️");
		deleteBtn.title = "删除";
		deleteBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.onDeleteClick?.(image);
		});
	}

	/**
	 * 渲染空状态
	 */
	private renderEmptyState(): void {
		const emptyEl = this.containerEl.createDiv("image-manager-empty-state");
		const msgEl = emptyEl.createDiv();
		msgEl.setText("📁 该文件夹中没有图片");
		const hintEl = emptyEl.createDiv("image-manager-empty-hint");
		hintEl.setText("支持 PNG, JPG, JPEG, GIF, BMP, WEBP, SVG, AGX 格式");
	}

	/**
	 * 显示加载状态
	 */
	showLoading(): void {
		this.containerEl.empty();
		const loadingEl = this.containerEl.createDiv("image-manager-loading-state");
		loadingEl.createDiv("image-manager-loading-spinner");
		const textEl = loadingEl.createDiv();
		textEl.setText("加载中...");
	}
}
