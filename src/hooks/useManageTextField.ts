import { useState, useCallback } from "react";

const INITIAL_TEXTFIELD_VALUE = "";

export const useManageTextField = () => {
    const [value, setValue] = useState(INITIAL_TEXTFIELD_VALUE);

    const setTextFieldValue = useCallback((text: string) => {
        setValue(text);
    }, []);
    const resetTextFieldValue = useCallback(() => {
        setValue(INITIAL_TEXTFIELD_VALUE);
    }, []);

    return { value, setTextFieldValue, resetTextFieldValue };
};

export default useManageTextField;
