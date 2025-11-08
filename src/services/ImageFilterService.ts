/**
 * 图片筛选服务
 */

import { ImageItem } from "../types/image-manager.types";

export class ImageFilterService {
	/**
	 * 应用筛选条件
	 */
	applyFilters(
		images: ImageItem[],
		searchQuery: string,
		showUnreferencedOnly: boolean
	): ImageItem[] {
		let filtered = images;

		// 搜索筛选
		if (searchQuery.trim()) {
			const searchTerm = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(image) =>
					image.name.toLowerCase().includes(searchTerm) ||
					image.path.toLowerCase().includes(searchTerm)
			);
		}

		// 未引用筛选
		if (showUnreferencedOnly) {
			filtered = filtered.filter(
				(image) => image.referenceCount === 0
			);
		}

		return filtered;
	}

	/**
	 * 仅搜索筛选
	 */
	filterBySearch(images: ImageItem[], searchQuery: string): ImageItem[] {
		if (!searchQuery.trim()) return images;

		const searchTerm = searchQuery.toLowerCase();
		return images.filter(
			(image) =>
				image.name.toLowerCase().includes(searchTerm) ||
				image.path.toLowerCase().includes(searchTerm)
		);
	}

	/**
	 * 仅未引用筛选
	 */
	filterUnreferenced(images: ImageItem[]): ImageItem[] {
		return images.filter((image) => image.referenceCount === 0);
	}
}
