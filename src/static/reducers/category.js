import {
    FETCH_CATEGORIES,
} from '../constants'


const initialState = {
  items: [
        {
          id: 10, name: '女装 / 男装 / 内衣',
          submenu: [
            {
              id: 11, name: '女装',
              submenu: [
                {
                  id: 1, name: '冬上新'
                },
                {
                  id: 1, name: '毛呢外套'
                },
                {
                  id: 1, name: '羽绒服'
                },
                {
                  id: 1, name: '裤子'
                },
                {
                  id: 1, name: '毛针织衫'
                },
              ]
            },
            {
              id: 12, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 13, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 14, name: '女装',
              submenu: [
                {
                  id: 1, name: '冬上新'
                },
                {
                  id: 1, name: '毛呢外套'
                },
                {
                  id: 1, name: '羽绒服'
                },
                {
                  id: 1, name: '裤子'
                },
                {
                  id: 1, name: '毛针织衫'
                },
              ]
            },
            {
              id: 15, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 16, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
          ]
        },
        {
          id: 20, name: '童装玩具 / 孕产 / 用品',
          submenu: [
            {
              id: 21, name: '童装玩具',
              submenu: [
                {
                  id: 1, name: '冬上新'
                },
                {
                  id: 1, name: '毛呢外套'
                },
                {
                  id: 1, name: '羽绒服'
                },
                {
                  id: 1, name: '裤子'
                },
                {
                  id: 1, name: '毛针织衫'
                },
              ]
            },
            {
              id: 22, name: '孕产',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 23, name: '用品',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 23, name: '女装',
              submenu: [
                {
                  id: 1, name: '冬上新'
                },
                {
                  id: 1, name: '毛呢外套'
                },
                {
                  id: 1, name: '羽绒服'
                },
                {
                  id: 1, name: '裤子'
                },
                {
                  id: 1, name: '毛针织衫'
                },
              ]
            },
            {
              id: 24, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 25, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
          ]
        },
        {
          id: 31, name: '美妆 / 洗护 / 保健品',
          submenu: [
            {
              id: 32, name: '女装',
              submenu: [
                {
                  id: 1, name: '冬上新'
                },
                {
                  id: 1, name: '毛呢外套'
                },
                {
                  id: 1, name: '羽绒服'
                },
                {
                  id: 1, name: '裤子'
                },
                {
                  id: 1, name: '毛针织衫'
                },
              ]
            },
            {
              id: 33, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 34, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 35, name: '女装',
              submenu: [
                {
                  id: 1, name: '冬上新'
                },
                {
                  id: 1, name: '毛呢外套'
                },
                {
                  id: 1, name: '羽绒服'
                },
                {
                  id: 1, name: '裤子'
                },
                {
                  id: 1, name: '毛针织衫'
                },
              ]
            },
            {
              id: 36, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 37, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
          ]
        },
        {
          id: 40, name: '珠宝 / 眼镜 / 手表',
          submenu: [
            {
              id: 41, 
              name: '珠宝',
              submenu: [
                {
                  id: 1, name: '冬上新'
                },
                {
                  id: 1, name: '毛呢外套'
                },
                {
                  id: 1, name: '羽绒服'
                },
                {
                  id: 1, name: '裤子'
                },
                {
                  id: 1, name: '毛针织衫'
                },
              ]
            },
            {
              id: 42, name: '眼镜',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 43, name: '手表',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 44, name: '女装',
              submenu: [
                {
                  id: 1, name: '冬上新'
                },
                {
                  id: 1, name: '毛呢外套'
                },
                {
                  id: 1, name: '羽绒服'
                },
                {
                  id: 1, name: '裤子'
                },
                {
                  id: 1, name: '毛针织衫'
                },
              ]
            },
            {
              id: 45, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
            {
              id: 46, name: '男装',
              submenu: [
                {
                  id: 1, name: '外套'
                },
                {
                  id: 1, name: '棉衣'
                },
                {
                  id: 1, name: '品质好物'
                },
                {
                  id: 1, name: '夹克'
                },
                {
                  id: 1, name: '卫衣'
                },
              ]
            },
          ]
        }
      ]
}

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
              ...state,
                items: action.categories
            }
        default:
            return state
    }
}