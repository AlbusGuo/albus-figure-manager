# 快速参考 - Albus Figure Manager

## 📁 项目结构速查

```
src/
├── types/              类型定义
├── models/             数据模型（缓存）
├── services/           业务逻辑服务
├── components/         UI组件
├── views/              视图（Modal）
├── utils/              工具类
└── styles/             样式文件
```

## 🔑 核心类快速参考

### Services（服务）

#### ImageLoaderService
```typescript
// 加载图片
const loader = new ImageLoaderService(app);
const images = await loader.loadImages(folderPath, sortOrder);

// 获取图片路径
const path = loader.getImageResourcePath(file);
```

#### ReferenceCheckService
```typescript
// 检查引用
const checker = new ReferenceCheckService(app);
const updatedImages = await checker.checkReferences(images);

// 清除缓存
checker.clearCache();
```

#### FileOperationService
```typescript
// 文件操作
const ops = new FileOperationService(app);
await ops.openFile(image);
await ops.renameFile(image, newName);
await ops.deleteFile(image, confirmDelete);
await ops.openReferenceFile(filePath);
```

#### ImageFilterService
```typescript
// 筛选
const filter = new ImageFilterService();
const filtered = filter.applyFilters(images, searchQuery, showUnreferencedOnly);
```

### Components（组件）

#### ImageGridComponent
```typescript
const grid = new ImageGridComponent(containerEl);

// 设置事件
grid.setEventHandlers({
    onImageClick: (image) => { /* ... */ },
    onImageDoubleClick: (image) => { /* ... */ },
    onOpenClick: (image) => { /* ... */ },
    onRenameClick: (image) => { /* ... */ },
    onDeleteClick: (image) => { /* ... */ },
});

// 渲染
grid.render(images, (img) => getImagePath(img));

// 显示加载
grid.showLoading();
```

#### SearchSortBarComponent
```typescript
const searchBar = new SearchSortBarComponent(containerEl);

// 设置事件
searchBar.setEventHandlers({
    onSearchChange: (query) => { /* ... */ },
    onSortChange: (order) => { /* ... */ },
});

// 获取/设置值
const query = searchBar.getSearchQuery();
searchBar.setSearchQuery("新查询");
const order = searchBar.getSortOrder();
searchBar.setSortOrder("asc");
```

#### HeaderComponent
```typescript
const header = new HeaderComponent(containerEl);

// 设置事件
header.setEventHandlers({
    onCheckReferences: () => { /* ... */ },
    onToggleUnreferencedFilter: () => { /* ... */ },
});

// 更新统计
header.updateStats(total, filtered, unreferenced);

// 设置状态
header.setCheckingState(isChecking);
header.setFilterButtonActive(active);
```

### Views（视图）

#### ImageManagerModal
```typescript
// 创建并打开
const modal = new ImageManagerModal(app, settings);
modal.open();
```

#### ImagePreviewModal
```typescript
// 预览图片
const preview = new ImagePreviewModal(
    app,
    image,
    references,
    (img) => getImagePath(img),
    (path) => openReference(path)
);
preview.open();
```

#### RenameModal
```typescript
// 重命名
const rename = new RenameModal(
    app,
    image,
    async (newName) => {
        // 处理重命名
    }
);
rename.open();
```

## 📊 数据流

### 加载图片流程
```
User Action → ImageManagerModal
    ↓
ImageLoaderService.loadImages()
    ↓
Process files → Sort → Return ImageItem[]
    ↓
ImageGridComponent.render()
```

### 检查引用流程
```
User clicks "检查引用" → ImageManagerModal
    ↓
ReferenceCheckService.checkReferences()
    ↓
Read all MD files → Check patterns → Cache results
    ↓
Update ImageItem.references → Re-render
```

### 文件操作流程
```
User clicks action → Component event
    ↓
FileOperationService.{operation}()
    ↓
Obsidian API call → Success/Error
    ↓
Clear cache → Reload → Update UI
```

## 🎨 样式命名规范

### BEM 风格
```css
.image-manager-{block}               /* 块 */
.image-manager-{block}--{modifier}   /* 修饰符 */
.image-manager-{block}__{element}    /* 元素（使用单个-） */
```

### 实际例子
```css
.image-manager-grid                  /* 网格块 */
.image-manager-grid-item             /* 网格项 */
.image-manager-grid-item:hover       /* 悬停状态 */
.image-manager-empty-state           /* 空状态 */
```

### CSS变量
```css
var(--background-primary)            /* 主背景 */
var(--background-secondary)          /* 次背景 */
var(--text-normal)                   /* 普通文本 */
var(--text-muted)                    /* 次要文本 */
var(--interactive-accent)            /* 强调色 */
var(--interactive-hover)             /* 悬停色 */
var(--radius-s)                      /* 小圆角 */
var(--radius-m)                      /* 中圆角 */
```

## 🔧 常用操作

### 添加新服务
```typescript
// 1. 创建服务文件
// src/services/NewService.ts
export class NewService {
    constructor(private app: App) {}
    
    async doSomething(): Promise<void> {
        // 实现功能
    }
}

// 2. 在 Modal 中使用
class ImageManagerModal {
    private newService: NewService;
    
    constructor(app: App, settings: Settings) {
        this.newService = new NewService(app);
    }
}
```

### 添加新组件
```typescript
// 1. 创建组件文件
// src/components/NewComponent.ts
export class NewComponent {
    private containerEl: HTMLElement;
    private onAction?: () => void;
    
    constructor(containerEl: HTMLElement) {
        this.containerEl = containerEl;
        this.render();
    }
    
    setEventHandlers(handlers: { onAction?: () => void }): void {
        this.onAction = handlers.onAction;
    }
    
    render(): void {
        // 渲染逻辑
    }
}

// 2. 在视图中使用
const component = new NewComponent(containerEl);
component.setEventHandlers({
    onAction: () => { /* ... */ }
});
```

### 添加新视图
```typescript
// 1. 创建视图文件
// src/views/NewModal.ts
import { App, Modal } from "obsidian";

export class NewModal extends Modal {
    constructor(app: App) {
        super(app);
    }
    
    onOpen(): void {
        const { contentEl } = this;
        // 渲染内容
    }
    
    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }
}

// 2. 打开视图
const modal = new NewModal(this.app);
modal.open();
```

### 添加样式
```css
/* 1. 创建样式文件 */
/* src/styles/new-feature.css */

/* 2. 添加样式 */
.image-manager-new-feature {
    /* 样式 */
}

/* 3. 在 main.ts 中导入 */
import "@styles/new-feature.css";
```

## 🐛 常见问题

### TypeScript 错误
```typescript
// 问题：找不到 'obsidian' 模块
// 解决：确保已安装依赖
npm install

// 问题：HTMLElement 上不存在属性
// 解决：使用 DOMHelper 或标准 DOM API
import { DOMHelper } from "./utils/DOMHelper";
DOMHelper.empty(element);
```

### 性能问题
```typescript
// 问题：大量图片加载慢
// 解决：使用缓存
if (cache.has(key)) {
    return cache.get(key);
}

// 问题：引用检查慢
// 解决：批量处理
await Promise.all(files.map(async (file) => {
    // 并行处理
}));
```

### UI问题
```css
/* 问题：样式不生效 */
/* 解决：检查选择器优先级，添加更具体的选择器 */
.image-manager-container .image-manager-grid-item {
    /* 更高优先级 */
}

/* 问题：深色模式下颜色异常 */
/* 解决：使用 CSS 变量 */
color: var(--text-normal);
background: var(--background-primary);
```

## 📦 导入导出

### 模块导出
```typescript
// src/index.ts
export * from "./types/image-manager.types";
export { ImageLoaderService } from "./services/ImageLoaderService";
// ...

// 使用
import { ImageLoaderService, ImageItem } from "./index";
```

### 样式导入
```typescript
// main.ts
import "@styles/image-manager.css";
import "@styles/image-preview-modal.css";
```

## 🧪 测试示例

### 服务测试
```typescript
describe('ImageLoaderService', () => {
    let service: ImageLoaderService;
    
    beforeEach(() => {
        service = new ImageLoaderService(mockApp);
    });
    
    it('should load images', async () => {
        const images = await service.loadImages('', 'desc');
        expect(images).toBeDefined();
    });
});
```

### 组件测试
```typescript
describe('ImageGridComponent', () => {
    let component: ImageGridComponent;
    let container: HTMLElement;
    
    beforeEach(() => {
        container = document.createElement('div');
        component = new ImageGridComponent(container);
    });
    
    it('should render images', () => {
        component.render(mockImages, mockGetPath);
        expect(container.children.length).toBeGreaterThan(0);
    });
});
```

## 🚀 性能优化建议

### 1. 使用缓存
```typescript
// 引用检查缓存
if (this.referenceCache.has(key)) {
    return this.referenceCache.get(key);
}
```

### 2. 批量操作
```typescript
// 并行读取文件
await Promise.all(files.map(async (file) => {
    const content = await this.app.vault.read(file);
    // ...
}));
```

### 3. 防抖搜索
```typescript
// 搜索输入防抖
let timeout: NodeJS.Timeout;
searchInput.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        this.onSearchChange?.(searchInput.value);
    }, 300);
});
```

### 4. 虚拟滚动
```typescript
// 大量图片时使用虚拟滚动
// 只渲染可见区域的图片
const visibleImages = images.slice(startIndex, endIndex);
```

## 📚 参考链接

- [Obsidian API Docs](https://docs.obsidian.md/Plugins)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [项目架构文档](./ARCHITECTURE.md)
- [使用指南](./USAGE.md)

## 💡 最佳实践

1. **始终使用 TypeScript 类型**
2. **保持服务单一职责**
3. **组件只负责 UI 渲染**
4. **使用事件处理器解耦**
5. **错误处理要完整**
6. **使用 CSS 变量适配主题**
7. **注释关键逻辑**
8. **遵循命名规范**

## 🎯 核心概念

### 分层架构
- **Types**: 类型定义，无依赖
- **Models**: 数据模型，简单缓存
- **Services**: 业务逻辑，与API交互
- **Components**: UI组件，渲染和交互
- **Views**: 视图协调器，组装组件和服务

### 数据流向
```
User → View → Component → Service → Model → API
                ↓
            State Update
                ↓
            Re-render
```
