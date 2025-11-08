import useSettingsStore from "./useSettingsStore";
import { IPluginSettings } from "@src/types/types";
import { useSyncExternalStore } from "react";

export function usePluginSettings() {
	const settingsStore = useSettingsStore();
	const pluginSettings = useSyncExternalStore(
		settingsStore.store.subscribe,
		settingsStore.store.getSnapshot
	);

	const updatePluginSettings = (newSettings: IPluginSettings) => {
		settingsStore.updateSettings(newSettings);
	};

	return {
		pluginSettings,
		updatePluginSettings,
	};
}
