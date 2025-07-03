export function mapMongo(doc) {
    const { _id, __v, ...rest } = doc;
    return { _id: _id.toString(), ...rest };
}
