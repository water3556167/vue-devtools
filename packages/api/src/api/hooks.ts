import { ComponentTreeNode, InspectedComponentData, ComponentInstance, ComponentDevtoolsOptions } from './component'
import { App } from './app'
import { CustomInspectorNode, CustomInspectorState, TimelineEvent } from './api'

export const enum Hooks {
  TRANSFORM_CALL = 'transformCall',
  GET_APP_RECORD_NAME = 'getAppRecordName',
  GET_APP_ROOT_INSTANCE = 'getAppRootInstance',
  REGISTER_APPLICATION = 'registerApplication',
  WALK_COMPONENT_TREE = 'walkComponentTree',
  VISIT_COMPONENT_TREE = 'visitComponentTree',
  WALK_COMPONENT_PARENTS = 'walkComponentParents',
  INSPECT_COMPONENT = 'inspectComponent',
  GET_COMPONENT_BOUNDS = 'getComponentBounds',
  GET_COMPONENT_NAME = 'getComponentName',
  GET_COMPONENT_INSTANCES = 'getComponentInstances',
  GET_ELEMENT_COMPONENT = 'getElementComponent',
  GET_COMPONENT_ROOT_ELEMENTS = 'getComponentRootElements',
  EDIT_COMPONENT_STATE = 'editComponentState',
  GET_COMPONENT_DEVTOOLS_OPTIONS = 'getAppDevtoolsOptions',
  GET_COMPONENT_RENDER_CODE = 'getComponentRenderCode',
  INSPECT_TIMELINE_EVENT = 'inspectTimelineEvent',
  GET_INSPECTOR_TREE = 'getInspectorTree',
  GET_INSPECTOR_STATE = 'getInspectorState',
  EDIT_INSPECTOR_STATE = 'editInspectorState'
}

export interface ComponentBounds {
  left: number
  top: number
  width: number
  height: number
}

export type HookPayloads = {
  [Hooks.TRANSFORM_CALL]: {
    callName: string
    inArgs: any[]
    outArgs: any[]
  }
  [Hooks.GET_APP_RECORD_NAME]: {
    app: App
    name: string
  }
  [Hooks.GET_APP_ROOT_INSTANCE]: {
    app: App
    root: ComponentInstance
  }
  [Hooks.REGISTER_APPLICATION]: {
    app: App
  }
  [Hooks.WALK_COMPONENT_TREE]: {
    componentInstance: ComponentInstance
    componentTreeData: ComponentTreeNode[]
    maxDepth: number
    filter: string
  }
  [Hooks.VISIT_COMPONENT_TREE]: {
    app: App
    componentInstance: ComponentInstance
    treeNode: ComponentTreeNode
    filter: string
  }
  [Hooks.WALK_COMPONENT_PARENTS]: {
    componentInstance: ComponentInstance
    parentInstances: ComponentInstance[]
  }
  [Hooks.INSPECT_COMPONENT]: {
    app: App
    componentInstance: ComponentInstance
    instanceData: InspectedComponentData
  }
  [Hooks.GET_COMPONENT_BOUNDS]: {
    componentInstance: ComponentInstance
    bounds: ComponentBounds
  }
  [Hooks.GET_COMPONENT_NAME]: {
    componentInstance: ComponentInstance
    name: string
  }
  [Hooks.GET_COMPONENT_INSTANCES]: {
    app: App
    componentInstances: ComponentInstance[]
  }
  [Hooks.GET_ELEMENT_COMPONENT]: {
    element: HTMLElement | any
    componentInstance: ComponentInstance
  }
  [Hooks.GET_COMPONENT_ROOT_ELEMENTS]: {
    componentInstance: ComponentInstance
    rootElements: (HTMLElement | any)[]
  }
  [Hooks.EDIT_COMPONENT_STATE]: {
    app: App
    componentInstance: ComponentInstance
    path: string[]
    type: string
    state: EditStatePayload
    set: (object: any, path: string | (string[]), value: any, cb?: (object: any, field: string, value: any) => void) => void
  }
  [Hooks.GET_COMPONENT_DEVTOOLS_OPTIONS]: {
    componentInstance: ComponentInstance
    options: ComponentDevtoolsOptions
  }
  [Hooks.GET_COMPONENT_RENDER_CODE]: {
    componentInstance: ComponentInstance
    code: string
  }
  [Hooks.INSPECT_TIMELINE_EVENT]: {
    app: App
    layerId: string
    event: TimelineEvent
    all?: boolean
    data: any
  }
  [Hooks.GET_INSPECTOR_TREE]: {
    app: App
    inspectorId: string
    filter: string
    rootNodes: CustomInspectorNode[]
  }
  [Hooks.GET_INSPECTOR_STATE]: {
    app: App
    inspectorId: string
    nodeId: string
    state: CustomInspectorState
  }
  [Hooks.EDIT_INSPECTOR_STATE]: {
    app: App
    inspectorId: string
    nodeId: string
    path: string[]
    type: string
    state: EditStatePayload
    set: (object: any, path: string | (string[]), value: any, cb?: (object: any, field: string, value: any) => void) => void
  }
}

export type EditStatePayload = {
  value: any
  newKey?: string | null
  remove?: undefined | false
} | {
  value?: undefined
  newKey?: undefined
  remove: true
}

export type HookHandler<TPayload, TContext> = (payload: TPayload, ctx: TContext) => void | Promise<void>

export interface Hookable<TContext> {
  transformCall (handler: HookHandler<HookPayloads[Hooks.TRANSFORM_CALL], TContext>)
  getAppRecordName (handler: HookHandler<HookPayloads[Hooks.GET_APP_RECORD_NAME], TContext>)
  getAppRootInstance (handler: HookHandler<HookPayloads[Hooks.GET_APP_ROOT_INSTANCE], TContext>)
  registerApplication (handler: HookHandler<HookPayloads[Hooks.REGISTER_APPLICATION], TContext>)
  walkComponentTree (handler: HookHandler<HookPayloads[Hooks.WALK_COMPONENT_TREE], TContext>)
  visitComponentTree (handler: HookHandler<HookPayloads[Hooks.VISIT_COMPONENT_TREE], TContext>)
  walkComponentParents (handler: HookHandler<HookPayloads[Hooks.WALK_COMPONENT_PARENTS], TContext>)
  inspectComponent (handler: HookHandler<HookPayloads[Hooks.INSPECT_COMPONENT], TContext>)
  getComponentBounds (handler: HookHandler<HookPayloads[Hooks.GET_COMPONENT_BOUNDS], TContext>)
  getComponentName (handler: HookHandler<HookPayloads[Hooks.GET_COMPONENT_NAME], TContext>)
  getComponentInstances (handler: HookHandler<HookPayloads[Hooks.GET_COMPONENT_INSTANCES], TContext>)
  getElementComponent (handler: HookHandler<HookPayloads[Hooks.GET_ELEMENT_COMPONENT], TContext>)
  getComponentRootElements (handler: HookHandler<HookPayloads[Hooks.GET_COMPONENT_ROOT_ELEMENTS], TContext>)
  editComponentState (handler: HookHandler<HookPayloads[Hooks.EDIT_COMPONENT_STATE], TContext>)
  getComponentDevtoolsOptions (handler: HookHandler<HookPayloads[Hooks.GET_COMPONENT_DEVTOOLS_OPTIONS], TContext>)
  getComponentRenderCode (handler: HookHandler<HookPayloads[Hooks.GET_COMPONENT_RENDER_CODE], TContext>)
  inspectTimelineEvent (handler: HookHandler<HookPayloads[Hooks.INSPECT_TIMELINE_EVENT], TContext>)
  getInspectorTree (handler: HookHandler<HookPayloads[Hooks.GET_INSPECTOR_TREE], TContext>)
  getInspectorState (handler: HookHandler<HookPayloads[Hooks.GET_INSPECTOR_STATE], TContext>)
  editInspectorState (handler: HookHandler<HookPayloads[Hooks.EDIT_INSPECTOR_STATE], TContext>)
}
