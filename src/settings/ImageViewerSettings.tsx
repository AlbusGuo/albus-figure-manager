/**
 * 图片查看器设置组件
 */

import { usePluginSettings } from "@src/hook/usePluginSettings";
import { SettingSwitch, SettingTitle, SettingDescription } from "./Settings";
import { DEFAULT_IMAGE_VIEWER_SETTINGS } from "@src/types/types";

export function ImageViewerSettings() {
	const { pluginSettings, updatePluginSettings } = usePluginSettings();
	const imageViewer = pluginSettings.imageViewer || DEFAULT_IMAGE_VIEWER_SETTINGS;

	const updateImageViewerSettings = (updates: Partial<typeof imageViewer>) => {
		updatePluginSettings({
			...pluginSettings,
			imageViewer: {
				...imageViewer,
				...updates,
			},
		});
	};

	return (
		<>
			<SettingDescription>
				按住 Ctrl 键点击图片可在全屏查看器中预览，支持滚轮缩放和拖拽移动
			</SettingDescription>

			<SettingSwitch
				label="启用图片查看器"
				description="在所有位置启用 Ctrl+点击图片查看功能"
				checked={imageViewer.enabled}
				onChange={(checked) =>
					updateImageViewerSettings({ enabled: checked })
				}
			/>
		</>
	);
}
