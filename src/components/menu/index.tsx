import type { PropType } from 'vue'
import { defineComponent, useAttrs } from 'vue'
import type { MenuItem } from '@/components/menu/types'
import Icon from '@/components/icon/index.vue'
import { Menu } from 'ant-design-vue'
import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface'
import { RouteLocationRaw, useRouter } from 'vue-router'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
    router: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const renderMenu = (data: MenuItem[]) => {
      return data.map((item) => {
        if (item.children && item.children.length && !item.group) {
          const subMenuSlots = {
            icon: () => item.icon && <Icon name={item.icon} />,
            title: () => <span>{item.title}</span>,
          }
          return (
            <Menu.SubMenu key={item.path} v-slots={subMenuSlots} disabled={item.disabled}>
              {renderMenu(item.children)}
            </Menu.SubMenu>
          )
        }
        if (item.group && item.children && (item.children as MenuItem[]).length) {
          return <Menu.ItemGroup title={item.title}>{renderMenu(item.children)}</Menu.ItemGroup>
        }
        const itemSlots = {
          icon: () => item.icon && <Icon name={item.icon} />,
        }
        return (
          <Menu.Item key={item.path} v-slots={itemSlots} disabled={item.disabled}>
            <span>{item.title}</span>
          </Menu.Item>
        )
      })
    }
    const attrs = useAttrs()
    const router = useRouter()
    const handleMenuClick = (item: MenuInfo) => {
      emit('click', item)
      if (props.router) {
        router.push(item.key as RouteLocationRaw)
      }
    }
    return () => (
      <Menu onClick={handleMenuClick} {...attrs}>
        {renderMenu(props.data)}
      </Menu>
    )
  },
})
