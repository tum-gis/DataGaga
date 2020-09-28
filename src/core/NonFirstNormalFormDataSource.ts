import {UnitDataSource, UnitDataSourceOptions} from "./UnitDataSource";

export abstract class NonFirstNormalFormDataSource extends UnitDataSource {
    protected constructor(options: UnitDataSourceOptions) {
        super(options);
    }
}

export interface NonFirstNormalFormDataSourceOptions extends UnitDataSourceOptions {
}