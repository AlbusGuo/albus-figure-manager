import { FC, ReactNode } from "react";
import { ImageManagerSettings } from "./ImageManagerSettings";

// 设置组件辅助组件
export const SettingTitle: FC<{ children: ReactNode }> = ({ children }) => (
	<h2 style={{
		marginTop: "1.5rem",
		marginBottom: "0.5rem",
		fontSize: "1.1rem",
		fontWeight: 600,
		color: "var(--text-normal)",
	}}>
		{children}
	</h2>
);

export const SettingDescription: FC<{ children: ReactNode }> = ({ children }) => (
	<div style={{
		marginBottom: "1rem",
		fontSize: "0.875rem",
		color: "var(--text-muted)",
		lineHeight: 1.6,
	}}>
		{children}
	</div>
);

export const SettingDivider: FC = () => (
	<hr style={{
		margin: "1.5rem 0",
		border: "none",
		borderTop: "1px solid var(--background-modifier-border)",
	}} />
);

export const Setting: FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
	<div style={{
		marginBottom: "1rem",
	}}>
		<div style={{
			marginBottom: "0.5rem",
			fontSize: "0.9rem",
			fontWeight: 500,
			color: "var(--text-normal)",
		}}>
			{label}
		</div>
		{children}
	</div>
);

export const SettingSwitch: FC<{
	label: string;
	description?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}> = ({ label, description, checked, onChange }) => (
	<div style={{
		display: "flex",
		alignItems: "flex-start",
		marginBottom: "1rem",
	}}>
		<div style={{ flex: 1 }}>
			<div style={{
				fontWeight: 500,
				color: "var(--text-normal)",
				marginBottom: description ? "0.25rem" : 0,
			}}>
				{label}
			</div>
			{description && (
				<div style={{
					fontSize: "0.875rem",
					color: "var(--text-muted)",
				}}>
					{description}
				</div>
			)}
		</div>
		<div style={{ marginLeft: "1rem" }}>
			<label style={{
				position: "relative",
				display: "inline-block",
				width: "44px",
				height: "24px",
				cursor: "pointer",
			}}>
				<input
					type="checkbox"
					checked={checked}
					onChange={(e) => onChange(e.target.checked)}
					style={{
						opacity: 0,
						width: 0,
						height: 0,
					}}
				/>
				<span style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: checked ? "var(--interactive-accent)" : "var(--background-modifier-border)",
					borderRadius: "24px",
					transition: "background-color 0.2s",
					cursor: "pointer",
				}}>
					<span style={{
						position: "absolute",
						content: "''",
						height: "18px",
						width: "18px",
						left: checked ? "23px" : "3px",
						bottom: "3px",
						backgroundColor: "white",
						borderRadius: "50%",
						transition: "left 0.2s",
					}} />
				</span>
			</label>
		</div>
	</div>
);

export const Settings: FC = () => {
	return (
		<div style={{
			padding: "1rem",
			maxWidth: "800px",
		}}>
			<ImageManagerSettings />
		</div>
	);
};
