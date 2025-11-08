/**
 * 图片加载缓存管理
 */

export class ImageLoadCache {
	private cache: Map<string, boolean> = new Map();

	/**
	 * 获取缓存
	 */
	get(key: string): boolean | undefined {
		return this.cache.get(key);
	}

	/**
	 * 设置缓存
	 */
	set(key: string, value: boolean): void {
		this.cache.set(key, value);
	}

	/**
	 * 检查是否存在
	 */
	has(key: string): boolean {
		return this.cache.has(key);
	}

	/**
	 * 删除缓存
	 */
	delete(key: string): void {
		this.cache.delete(key);
	}

	/**
	 * 清空缓存
	 */
	clear(): void {
		this.cache.clear();
	}
}
