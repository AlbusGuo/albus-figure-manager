/**
 * 图片管理器设置组件
 */

import { usePluginSettings } from "@src/hook/usePluginSettings";
import { useApp } from "@src/context/AppContext";
import { Setting, SettingDivider, SettingSwitch, SettingTitle, SettingDescription } from "./Settings";
import { CustomFileTypeConfig, SUPPORTED_IMAGE_EXTENSIONS, FileOpenMode } from "@src/types/image-manager.types";
import { FolderInput } from "@src/components/FolderInput";
import { FileOpenModeConfig } from "@src/components/FileOpenModeConfig";
import { useState, useMemo, useRef, useEffect } from "react";
import { setIcon } from "obsidian";

// 删除按钮组件
function DeleteButton({ onClick }: { onClick: () => void }) {
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (buttonRef.current) {
			buttonRef.current.empty();
			setIcon(buttonRef.current, "trash-2");
		}
	}, []);

	return (
		<button
			ref={buttonRef}
			onClick={onClick}
			className="clickable-icon"
			aria-label="删除"
			style={{ padding: "4px" }}
		/>
	);
}

export function ImageManagerSettings() {
	const app = useApp();
	const { pluginSettings, updatePluginSettings } = usePluginSettings();
	const imageManager = pluginSettings.imageManager || {};
	const [customTypes, setCustomTypes] = useState<CustomFileTypeConfig[]>(
		imageManager.customFileTypes || []
	);

	const updateImageManagerSettings = (updates: Partial<typeof imageManager>) => {
		updatePluginSettings({
			...pluginSettings,
			imageManager: {
				...imageManager,
				...updates,
			},
		});
	};

	const addCustomFileType = () => {
		const newType: CustomFileTypeConfig = {
			fileExtension: "",
			coverExtension: "",
			coverFolder: "",
		};
		const updated = [...customTypes, newType];
		setCustomTypes(updated);
		updateImageManagerSettings({ customFileTypes: updated });
	};

	const updateCustomFileType = (index: number, updates: Partial<CustomFileTypeConfig>) => {
		const updated = [...customTypes];
		updated[index] = { ...updated[index], ...updates };
		setCustomTypes(updated);
		updateImageManagerSettings({ customFileTypes: updated });
	};

	const removeCustomFileType = (index: number) => {
		const updated = customTypes.filter((_, i) => i !== index);
		setCustomTypes(updated);
		updateImageManagerSettings({ customFileTypes: updated });
	};

	// 获取所有可用的文件扩展名（包括自定义类型）
	const allExtensions = useMemo(() => {
		const extensions = new Set<string>([...SUPPORTED_IMAGE_EXTENSIONS]);
		// 添加自定义文件类型的扩展名
		customTypes.forEach((type) => {
			if (type.fileExtension) {
				extensions.add(type.fileExtension.toLowerCase());
			}
		});
		return Array.from(extensions).sort();
	}, [customTypes]);

	return (
		<>
			<SettingDescription>
				配置图片管理器的显示和行为选项
			</SettingDescription>

			<SettingSwitch
				label="显示文件大小"
				description="在图片卡片上显示文件大小信息"
				checked={imageManager.showFileSize !== false}
				onChange={(checked) =>
					updateImageManagerSettings({ showFileSize: checked })
				}
			/>

			<SettingSwitch
				label="显示修改时间"
				description="在图片卡片上显示最后修改时间"
				checked={imageManager.showModifiedTime !== false}
				onChange={(checked) =>
					updateImageManagerSettings({
						showModifiedTime: checked,
					})
				}
			/>

			<SettingSwitch
				label="默认筛选未引用图片"
				description="打开图片管理器时默认只显示未被引用的图片"
				checked={imageManager.defaultFilterUnreferenced === true}
				onChange={(checked) =>
					updateImageManagerSettings({
						defaultFilterUnreferenced: checked,
					})
				}
			/>

			<SettingSwitch
				label="删除前确认"
				description="删除文件前显示确认对话框"
				checked={imageManager.confirmDelete !== false}
				onChange={(checked) =>
					updateImageManagerSettings({ confirmDelete: checked })
				}
			/>

			<SettingDivider />

			<h4 className="setting-item-heading">自定义文件类型</h4>
			<SettingDescription>
				配置需要特殊处理的文件格式。这些文件将使用指定的封面文件进行显示，删除和重命名时会同时处理原文件和封面文件。
			</SettingDescription>

			{customTypes.map((type, index) => (
				<div key={index} className="setting-item">
					<div className="setting-item-info">
						<div className="setting-item-name">配置 {index + 1}</div>
					</div>
					<div className="setting-item-control" style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
						<input
							type="text"
							value={type.fileExtension}
							onChange={(e) => updateCustomFileType(index, { fileExtension: e.target.value.toLowerCase() })}
							placeholder="文件扩展名 (如: agx)"
							style={{ width: "120px" }}
						/>
						<span style={{ color: "var(--text-muted)" }}>→</span>
						<input
							type="text"
							value={type.coverExtension}
							onChange={(e) => updateCustomFileType(index, { coverExtension: e.target.value.toLowerCase() })}
							placeholder="封面扩展名 (如: svg)"
							style={{ width: "140px" }}
						/>
						<input
							type="text"
							value={type.coverFolder}
							onChange={(e) => updateCustomFileType(index, { coverFolder: e.target.value })}
							placeholder="封面文件夹 (可选)"
							style={{ width: "150px" }}
						/>
						<DeleteButton onClick={() => removeCustomFileType(index)} />
					</div>
				</div>
			))}

			<button
				onClick={addCustomFileType}
				className="mod-cta"
				style={{ marginTop: "8px" }}
			>
				+ 添加自定义文件类型
			</button>

			<SettingDivider />

			<h4 className="setting-item-heading">文件打开方式</h4>
			<SettingDescription>
				配置不同文件类型的打开方式。拖拽文件类型标签到相应区域来切换打开方式。
			</SettingDescription>

			<FileOpenModeConfig
				availableExtensions={allExtensions}
				fileOpenModes={imageManager.fileOpenModes || {}}
				onChange={(modes) => updateImageManagerSettings({ fileOpenModes: modes })}
			/>
		</>
	);
}
