# Obsidian Client Archive
Welcome, this is the official Obsidian Client archive!

If you want to look for packages or just explore the archive, please visit <https://archive.obsidian-client.com/>!

## Use it with Gradle

In your `build.gradle` file add the following repository:

```
repositories {

    maven {
        name = "Obsidian Client"
        url = "https://archive.obsidian-client.com/"
    }

}
```

That's it! Now you can start adding dependencies!

## Use it with Maven

In your `pom.xml` file add the following repository:

```
<repositories>

    <repository>
        <id>obsidian-client</id>
        <name>Obsidian Client</name>
        <url>https://archive.obsidian-client.com/</url>
    </repository>

</repositories>
```

That's it! Now you can start adding dependencies!
