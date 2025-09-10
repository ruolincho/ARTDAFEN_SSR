/**
 * TypedFormData 是一个帮助类，用于创建具有类型安全性的FormData对象.
 */
export default class TypedFormData<T extends Record<string, string | Blob>> {
    private formData: FormData;

    constructor() {
        this.formData = new FormData();
    }

    append<K extends keyof T>(key: K, value: T[K]) {
        this.formData.append(key as string, value);
    }

    getFormData(): FormData {
        return this.formData;
    }
}