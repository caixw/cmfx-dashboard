# 组件说明

## Paging

### 属性

| 名称        | 类型              | 默认值            | 描述
|-------------|-------------------|-------------------|-------------
| url         | string            | 无                | 列表页请求的地址
| queries     | {[x:string]:any}  | undefined         | 查询参数对象
| pageSizes   | []number          | [20,50,100,200]   | 分页数值
| paging      | boolean           | true              | 是否分页
| columns     | []DataTableColumn | 无                | 列定义
| row-key     | string|undefined  | undefined         | 带有选择列时，该值是必须的，表示唯一字段的字段名。

### 方法

#### reload

表示重新加载数据的方法，其类签名为：

```ts
{
    (before: {():boolean}):void
}
```

before 表示在执行刷新之前可以执行的额外，只有该方法返回 true，才会真正执行刷新操作。

### slot

- actions
- search
