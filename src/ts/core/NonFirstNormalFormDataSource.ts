///<reference path="UnitDataSource.ts"/>

abstract class NonFirstNormalFormDataSource extends UnitDataSource {
    protected constructor(options: UnitDataSourceOptions) {
        super(options);
    }
}

interface NonFirstNormalFormDataSourceOptions extends UnitDataSourceOptions {
}