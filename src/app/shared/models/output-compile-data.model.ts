export class OutputCompileData {
    output: string;
    errorCode: number;
    message: string;
    compilationStatus?: CompilationStatus;
}

export enum CompilationStatus {
    success,
    error,
}