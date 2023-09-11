# Memorable

## Get Started

~~~bash
# To create an item
mem new [key] [value]

# To retrieve an item
mem item [key | id]

# To get the value of an item
mem val [key | id]

# To get the id of an item
mem id [key]
~~~
Key conflicts: different items distinguished by IDs.

## Tags
~~~bash
# To get a tag (create if not exist)
mem tag [label]

# To bind a tag to an item
mem bind [key | id] [label]

# To gets all tags to an item
mem tags [key | id]
~~~