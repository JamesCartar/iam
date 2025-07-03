export function mapMongo<T>(doc: any): T {
    const { _id, __v, ...rest } = doc;
    return { _id: _id.toString(), ...rest } as T;
}
