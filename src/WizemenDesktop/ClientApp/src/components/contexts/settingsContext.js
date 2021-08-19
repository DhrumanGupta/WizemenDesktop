import React from "react";

const SettingsContext = React.createContext()

const SettingsProvider = SettingsContext.Provider
const SettingsConsumer = SettingsContext.Consumer

export {SettingsProvider, SettingsConsumer}