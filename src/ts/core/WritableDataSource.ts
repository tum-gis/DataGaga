interface WritableDataSource {
    insertDataRecord(record: DataRecord): boolean;
    updateDataRecordUsingId(id: string, newRecord: DataRecord): boolean;
    deleteDataRecordUsingId(id: string): boolean;
}