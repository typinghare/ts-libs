## Resource

Resources encompass any content loaded during the program's bootstrap, available throughout its entire lifecycle. This includes instances, texts, pictures, and other essential components. All resources need to be registered during the program's loading phase and can be accessed at any point during execution.

### Resource Location

A resource location comprises both a namespace and a location. The namespace is a string serves to differentiate between two resources sharing the same location. Meanwhile, the location represents the relative path to resources that correspond to specific assets, or alternatively, an arbitrary string.

The namespace consists of capital and lowercase letters, digits, and underscores. On the other hand, the location can include capital and lowercase letters, digits, as well as specific special characters (./_-). According to convention, namespaces are written in PascalCase, while locations follow snake_case.

A resource location string is a function of the namespace and location, delineated by a colon. To illustrate, consider the instance where the namespace is "Registry" and the location is "gem". In this scenario, the resulting resource location string would be "Registry:gem". In essence, a resource location can be viewed as a string, which is encapsulated within a `ResLoc` class.

It is allowed to create a resource location instance with new keyword; however, this approach is not recommended. Instead, a preferable method for creating a resource location involves first generating a concrete instance of the `ResLocBuilder` class, and subsequently crafting it through that instance. Notably, there exists a builtin resource location builder in `RegistryBuiltin`, with the namespace set as "Builtin", and you can also leverage the helper function provided in `RegistryUtil`. Here's an example of how to create resource locations:

~~~typescript
// loc1 and loc2 are equivalent
const loc1 = RegistryBuiltin.RES_LOC_BUILDER.create('gem')
const loc2 = RegistryUtil.createLoc('gem')
~~~

### Resource Key

Each resource within the game possesses a unique identifier knows as a resource key, which is composed of two distinct resource locations: the parent and the location. In the context of regular resources, the parent resource location corresponds to the location of its specific registry, while the location pertains to the resource's designated name.

Registries constitute a distinctive class of resources. The resource key attributed to a registry is called the registry key. Within this category, a prominent inclusion of that is the root registry, responsible for the registration of other registries. Uniquely, the parent of a registry key is the root location (see `RegistryBuiltin.ROOT_LOC`). For a more comprehensive grasp of these concepts, specific examples are provided in the dedicated [Registry](./registry.md) chapter. Here's a practical example that demonstrates the creation of a registry:

~~~typescript
// Create a registry key; in this example, the builtin resource location builder is used
const registryKey = RegistryUtil.createRegistryKey('gem')

// Create a registry; <T> is the type of resources
const registry: Registry<T> = new DefaultRegistry<T>(registryKey)

// Regsiter the registry in the root registry
Registries.ROOT.register(registryKey.getLocation(), registry)

// RegistryUtil provides a helper function encapsualting the above processes
const registry2 = RegistryUtil.createRegistry<T>('gem')
~~~

### Register Resources with Registry

Upon successfully creating a registry, the next step involves the registration of resources within it. This process
prompts the registry to generate a unique resource key for each registered item. The parent of this resource key
corresponds to the location of the associated registry key, while the path is supplied as an additional identifier. In
this context, a reference is generated to encapsulate the resource, along with pertinent information such as its ID and
any relevant tags.

To access resources, one can utilize either their resource location or resource key. Conversely, resources are also
equipped with the capability to retrieve their corresponding resource key. As resources are registered, they are
sequentially added to a list, with the associated index in the list serving as the resource's ID.

It's essential to note that once a resource is registered, it becomes a permanent part of the registry and cannot be
removed or deleted subsequently. This ensures the stability and consistency of the game's resources throughout its
runtime.

~~~typescript
// Create a registry that accepts string resources
const registry = RegistryUtil.createRegistry<string>('gem')

// Create resource locations
const locEnglishHelloWorld = RegistryUtil.createLoc('english_hello_world')
const locChineseHelloWorld = RegistryUtil.createLoc('chinese_hello_world')

// Register resources
resgitry.register(locEnglishHelloWorld, 'Hello, world!')
resgitry.register(locChineseHelloWorld, '你好，世界!')

// Retrieve resources
const englishHelloWorld = registry.getByLoc(locEnglishHelloWorld)
const chineseHelloWorld = registry.getByLoc(locChineseHelloWorld)
~~~