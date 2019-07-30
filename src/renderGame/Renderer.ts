/**
 * 渲染器的抽象类，每个渲染器都必须继承该抽象类
 * 当子类实例化的时候，会自动将实例注册到渲染总线上，随后每次渲染循环中就会自动调用实例上的render方法
 * 当不需要渲染后，需要手动remove掉该渲染
 */
import { uniqueId } from 'src/utils'
import { renderingBus } from '../renderingBus'

export abstract class Renderer {
  private readonly id: string

  protected constructor(type?: string) {
    this.id = uniqueId(type || '')

    /**
     * 将当前渲染器的render函数注册到渲染列表上
     */
    renderingBus.registerRenderer(this.id, this.render.bind(this))
  }

  remove() {
    renderingBus.removeRenderer(this.id)
  }

  /**
   * 每个渲染器的渲染函数
   */
  abstract render(): void
}