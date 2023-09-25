export class FakeHttpGateway {
  get = async () => {
    return Promise.resolve({
      json: () => ({
        success: false,
      }),
    });
  };
}
