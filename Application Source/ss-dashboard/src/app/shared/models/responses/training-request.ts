export interface TrainingRequest {
    name: string;
    categories: string[];
    modelId: string;
    epochs: number;
    scrape: boolean;
}
