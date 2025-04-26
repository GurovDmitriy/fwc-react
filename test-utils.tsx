import { ContainerProviderContext } from "@/composition/container/client/ContainerProvider"
import { configureStore, createSlice } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

export class TestBed {
  private mockDeps: Map<any, any>

  public Provider = ({ children }: { children: any }) => {
    return (
      <ContainerProviderContext
        value={{
          inject: <TType = any, TToken = unknown>(
            serviceIdentifier: TToken,
          ): TType => {
            return this.mockDeps.get(serviceIdentifier)
          },
        }}
      >
        <Provider
          store={configureStore({
            reducer: {
              auth: createSlice({
                name: "auth",
                initialState: {},
                reducers: {},
              }).reducer,
            },
          })}
        >
          {children}
        </Provider>
      </ContainerProviderContext>
    )
  }

  constructor(config: { deps: [token: any, mock: any][] }) {
    this.mockDeps = new Map(config.deps)
  }

  inject(token: any) {
    return this.mockDeps.get(token)
  }

  destroy() {
    this.mockDeps.clear()
  }
}
