# Albus Figure Manager - 项目架构说明

## 📁 项目结构

本项目采用分层架构设计，遵循低耦合高内聚的原则。

```
src/
├── types/                      # 类型定义层
│   ├── types.ts               # 插件主类型
│   └── image-manager.types.ts # 图片管理器类型
│
├── models/                     # 数据模型层
│   ├── ReferenceCache.ts      # 引用缓存模型
│   └── ImageLoadCache.ts      # 图片加载缓存模型
│
├── services/                   # 业务逻辑服务层
│   ├── ImageLoaderService.ts  # 图片加载服务
│   ├── ReferenceCheckService.ts # 引用检查服务
│   ├── FileOperationService.ts  # 文件操作服务
│   └── ImageFilterService.ts    # 图片筛选服务
│
├── components/                 # UI组件层
│   ├── ImageGridComponent.ts  # 图片网格组件
│   ├── SearchSortBarComponent.ts # 搜索排序栏组件
│   └── HeaderComponent.ts     # 头部组件
│
├── views/                      # 视图层（Modal）
│   ├── ImageManagerModal.ts   # 图片管理器主视图
│   ├── ImagePreviewModal.ts   # 图片预览Modal
│   └── RenameModal.ts         # 重命名Modal
│
├── utils/                      # 工具类层
│   └── DOMHelper.ts           # DOM操作辅助类
│
├── styles/                     # 样式文件层
│   ├── image-manager.css      # 主视图样式
│   ├── image-preview-modal.css # 预览Modal样式
│   └── rename-modal.css       # 重命名Modal样式
│
├── settings/                   # 设置相关
│   ├── Settings.tsx
│   ├── SettingsStore.ts
│   └── PluginSettingTab.tsx
│
└── main.ts                     # 插件入口
```

## 🏗️ 架构设计原则

### 1. 分层架构（Layered Architecture）

**类型定义层 (Types Layer)**
- 定义所有数据结构和接口
- 提供类型安全保障
- 无依赖，被其他层引用

**数据模型层 (Models Layer)**
- 管理数据缓存
- 封装数据操作逻辑
- 轻量级，专注于数据管理

**服务层 (Services Layer)**
- 核心业务逻辑
- 与Obsidian API交互
- 可复用的功能模块
- 服务之间相互独立

**组件层 (Components Layer)**
- UI组件封装
- 处理用户交互
- 渲染视图元素
- 组件间解耦

**视图层 (Views Layer)**
- 组装组件
- 协调服务调用
- 管理状态
- Modal实现

**工具层 (Utils Layer)**
- 通用工具函数
- DOM操作辅助
- 格式化函数

### 2. 低耦合高内聚 (Low Coupling, High Cohesion)

**低耦合设计**
```typescript
// ❌ 不好的设计 - 高耦合
class ImageManager {
  loadImages() { /* ... */ }
  checkReferences() { /* ... */ }
  filterImages() { /* ... */ }
  openFile() { /* ... */ }
  deleteFile() { /* ... */ }
}

// ✅ 好的设计 - 低耦合
class ImageLoaderService { loadImages() { /* ... */ } }
class ReferenceCheckService { checkReferences() { /* ... */ } }
class ImageFilterService { filterImages() { /* ... */ } }
class FileOperationService { 
  openFile() { /* ... */ }
  deleteFile() { /* ... */ }
}
```

**高内聚设计**
- 每个模块只负责一个明确的功能
- 相关功能聚合在一起
- 减少跨模块依赖

### 3. 单一职责原则 (Single Responsibility Principle)

每个类/模块只有一个改变的理由：

- `ImageLoaderService`: 只负责加载图片
- `ReferenceCheckService`: 只负责检查引用
- `FileOperationService`: 只负责文件操作
- `ImageFilterService`: 只负责图片筛选

### 4. 依赖注入 (Dependency Injection)

```typescript
// 通过构造函数注入依赖
class ImageManagerModal {
  private imageLoader: ImageLoaderService;
  private referenceChecker: ReferenceCheckService;
  
  constructor(app: App, settings: Settings) {
    this.imageLoader = new ImageLoaderService(app);
    this.referenceChecker = new ReferenceCheckService(app);
  }
}
```

## 🔄 数据流

```
User Interaction (用户交互)
    ↓
View Layer (视图层)
    ↓
Component Layer (组件层)
    ↓
Service Layer (服务层)
    ↓
Model Layer (模型层)
    ↓
Obsidian API
```

## 📦 模块说明

### Services（服务层）

#### ImageLoaderService
- 加载文件夹中的图片
- 处理AGX/SVG文件关联
- 图片排序

#### ReferenceCheckService
- 检查图片引用
- 解析Markdown文件
- 缓存引用结果

#### FileOperationService
- 打开文件
- 重命名文件
- 删除文件
- 打开引用文档

#### ImageFilterService
- 搜索筛选
- 未引用筛选
- 组合筛选

### Components（组件层）

#### ImageGridComponent
- 渲染图片网格
- 处理图片点击事件
- 显示加载/空状态

#### SearchSortBarComponent
- 搜索输入框
- 排序选择器
- 事件处理

#### HeaderComponent
- 统计信息显示
- 操作按钮
- 状态管理

### Views（视图层）

#### ImageManagerModal
- 主视图协调器
- 状态管理
- 组装所有组件

#### ImagePreviewModal
- 图片预览
- 详细信息显示
- 引用列表

#### RenameModal
- 文件重命名界面
- 输入验证

## 🎨 样式组织

每个视图都有对应的CSS文件：

- `image-manager.css`: 主视图和组件样式
- `image-preview-modal.css`: 预览Modal样式
- `rename-modal.css`: 重命名Modal样式

所有样式使用 `.image-manager-` 前缀，避免命名冲突。

## 🔧 扩展性

### 添加新功能

1. **添加新服务**
   ```typescript
   // src/services/NewService.ts
   export class NewService {
     constructor(private app: App) {}
     // 实现功能
   }
   ```

2. **添加新组件**
   ```typescript
   // src/components/NewComponent.ts
   export class NewComponent {
     constructor(containerEl: HTMLElement) {}
     render() { /* ... */ }
   }
   ```

3. **添加新视图**
   ```typescript
   // src/views/NewModal.ts
   export class NewModal extends Modal {
     // 实现视图
   }
   ```

### 修改现有功能

由于模块间低耦合，修改一个模块不会影响其他模块：

- 修改引用检查逻辑 → 只需修改 `ReferenceCheckService`
- 修改UI样式 → 只需修改对应CSS文件
- 修改筛选逻辑 → 只需修改 `ImageFilterService`

## 🧪 测试建议

```typescript
// 服务层单元测试
describe('ImageLoaderService', () => {
  it('should load images from folder', async () => {
    // 测试加载功能
  });
});

// 组件单元测试
describe('ImageGridComponent', () => {
  it('should render images', () => {
    // 测试渲染
  });
});
```

## 📚 最佳实践

1. **保持服务独立**: 服务之间不要相互依赖
2. **组件纯粹性**: 组件只负责UI，不包含业务逻辑
3. **类型安全**: 充分利用TypeScript类型系统
4. **错误处理**: 每个服务都应该有适当的错误处理
5. **缓存策略**: 合理使用缓存提高性能
6. **命名规范**: 使用清晰的命名约定

## 🚀 性能优化

1. **引用缓存**: 避免重复检查同一图片的引用
2. **图片加载缓存**: 记录图片加载状态
3. **批量操作**: 并行读取多个文件
4. **懒加载**: 按需加载数据
5. **虚拟滚动**: 大量图片时使用虚拟滚动（待实现）

## 📖 相关文档

- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api)
- [TypeScript文档](https://www.typescriptlang.org/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
