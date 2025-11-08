/**
 * 图片管理器相关类型定义
 */

import { TFile } from "obsidian";

/**
 * 图片文件项
 */
export interface ImageItem {
	/** 文件名 */
	name: string;
	/** 文件路径 */
	path: string;
	/** 原始文件对象 */
	originalFile: TFile;
	/** 显示用的文件对象（对于AGX文件，这是对应的SVG文件） */
	displayFile: TFile;
	/** 是否为AGX文件 */
	isAgx: boolean;
	/** 文件统计信息 */
	stat: {
		ctime: number;
		mtime: number;
		size: number;
	};
	/** 引用信息 */
	references?: ReferenceInfo[];
	/** 引用计数 */
	referenceCount?: number;
}

/**
 * 引用信息
 */
export interface ReferenceInfo {
	/** 引用文件 */
	file: TFile;
	/** 引用类型 */
	type: "link" | "embed";
	/** 引用位置（行号） */
	position?: {
		start: { line: number; col: number };
		end: { line: number; col: number };
	};
}

/**
 * 图片管理器设置
 */
export interface ImageManagerSettings {
	/** 默认文件夹路径 */
	folderPath?: string;
	/** 显示文件大小 */
	showFileSize?: boolean;
	/** 显示修改时间 */
	showModifiedTime?: boolean;
	/** 默认筛选未引用图片 */
	defaultFilterUnreferenced?: boolean;
	/** 删除前确认 */
	confirmDelete?: boolean;
}

/**
 * 排序字段
 */
export type SortField = "mtime" | "ctime" | "size" | "name" | "references";

/**
 * 排序顺序
 */
export type SortOrder = "asc" | "desc";

/**
 * 引用检查结果
 */
export interface ReferenceCheckResult {
	references: ReferenceInfo[];
	referenceCount: number;
}

/**
 * 支持的图片格式
 */
export const SUPPORTED_IMAGE_EXTENSIONS = [
	"png",
	"jpg",
	"jpeg",
	"gif",
	"bmp",
	"webp",
	"svg",
	"agx",
] as const;

export type ImageExtension = (typeof SUPPORTED_IMAGE_EXTENSIONS)[number];
