/**
 * 图片管理器设置组件
 */

import { usePluginSettings } from "@src/hook/usePluginSettings";
import { Setting, SettingDivider, SettingSwitch, SettingTitle, SettingDescription } from "./Settings";

export function ImageManagerSettings() {
	const { pluginSettings, updatePluginSettings } = usePluginSettings();
	const imageManager = pluginSettings.imageManager || {};

	const updateImageManagerSettings = (updates: Partial<typeof imageManager>) => {
		updatePluginSettings({
			...pluginSettings,
			imageManager: {
				...imageManager,
				...updates,
			},
		});
	};

	return (
		<>
			<SettingTitle>图片管理器</SettingTitle>
			<SettingDescription>
				配置图片管理器的基本参数和显示选项。文件夹路径现在可以直接在管理器界面中设置。
				<br />
				图片引用情况会在加载时自动检查。
			</SettingDescription>

			<SettingTitle>显示选项</SettingTitle>

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

			<SettingDivider />

			<SettingTitle>行为选项</SettingTitle>

			<SettingSwitch
				label="删除前确认"
				description="删除文件前显示确认对话框"
				checked={imageManager.confirmDelete !== false}
				onChange={(checked) =>
					updateImageManagerSettings({ confirmDelete: checked })
				}
			/>

			<SettingDescription>
				注意：支持 PNG, JPG, JPEG, GIF, BMP, WEBP, SVG, AGX 格式。
				<br />
				AGX文件将自动使用同名的SVG文件作为封面显示，引用检查也会基于SVG文件进行。
			</SettingDescription>
		</>
	);
}
