import { MakingChargesType, RateConfig, useRateConfig } from "../contexts/RateConfigContext";

export const useRateSetupMakingCharges = (
  externalConfig?: RateConfig,
  externalUpdate?: (updates: Partial<RateConfig>) => void
) => {
  const { config, updateConfig } = useRateConfig();
  const activeConfig = externalConfig || config;
  const activeUpdate = externalUpdate || ((u) => updateConfig(u));

  const handleToggleMakingCharges = () => {
    const next = !activeConfig.makingChargesEnabled;
    activeUpdate({ makingChargesEnabled: next });
  };

  const handleChangeMakingType = (
    metal: "gold" | "silver",
    type: MakingChargesType
  ) => {
    if (metal === "gold") {
      activeUpdate({ makingChargesGoldType: type });
    } else {
      activeUpdate({ makingChargesSilverType: type });
    }
  };

  const handleMakingValueChange = (metal: "gold" | "silver", text: string) => {
    const numeric = parseFloat(text.replace(/[^0-9.]/g, ""));
    const safe = isNaN(numeric) ? 0 : numeric;
    if (metal === "gold") {
      activeUpdate({ makingChargesGoldValue: safe });
    } else {
      activeUpdate({ makingChargesSilverValue: safe });
    }
  };

  return {
    makingChargesEnabled: activeConfig.makingChargesEnabled,
    makingChargesGoldType: activeConfig.makingChargesGoldType,
    makingChargesGoldValue: activeConfig.makingChargesGoldValue,
    makingChargesSilverType: activeConfig.makingChargesSilverType,
    makingChargesSilverValue: activeConfig.makingChargesSilverValue,
    handleToggleMakingCharges,
    handleChangeMakingType,
    handleMakingValueChange,
  };
};
