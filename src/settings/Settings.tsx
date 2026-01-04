import { FC, ReactNode } from "react";
import { ImageManagerSettings } from "./ImageManagerSettings";
import { ImageResizeSettings } from "./ImageResizeSettings";
import { ImageViewerSettings } from "./ImageViewerSettings";

// 设置组件辅助组件 - 使用 Obsidian 默认样式
export const SettingMainTitle: FC<{ children: ReactNode }> = ({ children }) => (
	<h3 className="setting-item-heading" style={{ fontSize: "1.5em", marginTop: "1em", marginBottom: "0.5em" }}>
		{children}
	</h3>
);

export const SettingTitle: FC<{ children: ReactNode }> = ({ children }) => (
	<h2 className="setting-item-heading">
		{children}
	</h2>
);

export const SettingDescription: FC<{ children: ReactNode }> = ({ children }) => (
	<div className="setting-item-description">
		{children}
	</div>
);

export const SettingDivider: FC = () => (
	<div style={{ marginTop: "18px", marginBottom: "18px" }} />
);

export const Setting: FC<{ label: string; description?: string; children: ReactNode }> = ({ label, description, children }) => (
	<div className="setting-item">
		<div className="setting-item-info">
			<div className="setting-item-name">{label}</div>
			{description && <div className="setting-item-description">{description}</div>}
		</div>
		<div className="setting-item-control">
			{children}
		</div>
	</div>
);

export const SettingSwitch: FC<{
	label: string;
	description?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}> = ({ label, description, checked, onChange }) => (
	<div className="setting-item">
		<div className="setting-item-info">
			<div className="setting-item-name">{label}</div>
			{description && <div className="setting-item-description">{description}</div>}
		</div>
		<div className="setting-item-control">
			<div className={`checkbox-container${checked ? ' is-enabled' : ''}`} onClick={() => onChange(!checked)}>
				<input
					type="checkbox"
					checked={checked}
					onChange={(e) => onChange(e.target.checked)}
				/>
			</div>
		</div>
	</div>
);

export const Settings: FC = () => {
	return (
		<div>
			<SettingMainTitle>图片管理器</SettingMainTitle>
			<ImageManagerSettings />
			<SettingDivider />
			<SettingMainTitle>图片调整大小</SettingMainTitle>
			<ImageResizeSettings />
			<SettingDivider />
			<SettingMainTitle>图片查看器</SettingMainTitle>
			<ImageViewerSettings />
		</div>
	);
};
