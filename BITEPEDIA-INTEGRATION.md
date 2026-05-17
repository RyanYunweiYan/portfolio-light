# Bitepedia Demo · 集成说明

> 给未来接手的 agent / Ryan 自己看。Bitepedia 作为独立项目存在,这个 repo 只 host 它的 demo 输出。

## 它是什么

`BitepediaSection` 是 Home 页面的一个 section,**iframe 嵌入** Bitepedia 静态 demo(中文图鉴风格的食物剖面 + SVG 标注 + 点击下钻交互)。招聘官在个人主页滚动到这个 section 直接交互 demo,不用跳转外站。

## 文件分布

| 文件 | 角色 |
|---|---|
| `client/src/components/BitepediaSection.tsx` | iframe 容器组件(title + 副标 + iframe + 全屏链接),lazy-loaded |
| `client/src/pages/Home.tsx` | 在 `<About />` 之后、`<Projects />` 之前渲染 `<BitepediaSection />` |
| `client/public/bitepedia/` | demo 静态文件(9 个 HTML + 1 个 `_source/` 含 9 张 PNG)。Vite build 时整个复制到 `dist/` |

## 关键细节(踩过的坑)

1. **iframe src 必须用 `/bitepedia/index.html`(加 .html 后缀)**,不能用 `/bitepedia/`。后者会被 React Router SPA fallback 拦截渲染 404。
2. **Bitepedia 是独立项目**,源代码在 `~/Projects/AI创意作品/bitepedia/`(不在本 repo)。不要试图在这个 repo 改 demo 内容,改了下次 build 会被覆盖。
3. **public/bitepedia/ 不进手工 edit**,由独立项目的 `build_site.py --deploy` 自动同步过来。

## 如何更新 demo 内容

```bash
cd ~/Projects/AI创意作品/bitepedia
# 1. 改图 / 标注:用浏览器打开 annotate-tool.html 拖动,导出 JSON,cp 到 annotations.json
# 2. build + 自动 sync 到本 repo public/bitepedia/
python3 build_site.py --deploy
# 3. 回这个 repo 提交
cd -
git add client/public/bitepedia
git commit -m "sync bitepedia demo"
git push
```

## 修改 BitepediaSection 本身(标题/间距/iframe 高度)

直接改 `client/src/components/BitepediaSection.tsx`:
- 主标题、副标、hint 文案
- `<section>` 的 `pt-/pb-` 控制跟前后 section 的间距
- iframe `style.height` 控制 demo 显示高度

## 部署

Vercel auto-deploy on `main` push。`public/bitepedia/` 作为静态资源自动包含在 build 输出中,部署后访问 `<生产域名>/bitepedia/index.html` 直接 serve 静态 demo。
