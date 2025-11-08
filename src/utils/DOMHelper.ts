/**
 * DOM工具类 - 兼容Obsidian的HTML元素扩展方法
 */

/**
 * 为标准HTMLElement添加Obsidian扩展方法
 */
export class DOMHelper {
	/**
	 * 清空元素
	 */
	static empty(el: HTMLElement): void {
		el.innerHTML = "";
	}

	/**
	 * 创建div元素
	 */
	static createDiv(
		parent: HTMLElement,
		options?: {
			cls?: string;
			text?: string;
			attr?: Record<string, string>;
		}
	): HTMLDivElement {
		const div = document.createElement("div");
		if (options?.cls) {
			div.className = options.cls;
		}
		if (options?.text) {
			div.textContent = options.text;
		}
		if (options?.attr) {
			Object.entries(options.attr).forEach(([key, value]) => {
				div.setAttribute(key, value);
			});
		}
		parent.appendChild(div);
		return div;
	}

	/**
	 * 创建元素
	 */
	static createEl<K extends keyof HTMLElementTagNameMap>(
		parent: HTMLElement,
		tag: K,
		options?: {
			cls?: string;
			text?: string;
			attr?: Record<string, string>;
		}
	): HTMLElementTagNameMap[K] {
		const el = document.createElement(tag);
		if (options?.cls) {
			el.className = options.cls;
		}
		if (options?.text) {
			el.textContent = options.text;
		}
		if (options?.attr) {
			Object.entries(options.attr).forEach(([key, value]) => {
				el.setAttribute(key, value);
			});
		}
		parent.appendChild(el);
		return el;
	}

	/**
	 * 添加类名
	 */
	static addClass(el: HTMLElement, cls: string): void {
		el.classList.add(cls);
	}

	/**
	 * 移除类名
	 */
	static removeClass(el: HTMLElement, cls: string): void {
		el.classList.remove(cls);
	}

	/**
	 * 切换类名
	 */
	static toggleClass(el: HTMLElement, cls: string, force?: boolean): void {
		if (force !== undefined) {
			el.classList.toggle(cls, force);
		} else {
			el.classList.toggle(cls);
		}
	}

	/**
	 * 检查是否有类名
	 */
	static hasClass(el: HTMLElement, cls: string): boolean {
		return el.classList.contains(cls);
	}

	/**
	 * 设置文本
	 */
	static setText(el: HTMLElement, text: string): void {
		el.textContent = text;
	}
}
