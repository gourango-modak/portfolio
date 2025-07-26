---
tags: Test, Test2, Test, Test3,Test4, Test25,Test6, Test26,Test7, Test23,Test33, Test23,Test34, Test244,Test442, Test2532,Test3424, Test2234
summary: Hello there
---

# 🥅 Goal

Write a function that generates a **globally unique identifier (ID)** each time it is invoked. This ID will be used to uniquely identify **any entity**.

# 🔒 Constraints

-   **ID must be generated on the Application Server**
    -   [[Reason behind - ID must be generated on the Application Server]]
-   **ID must not exceed 64 bits in length**
    -   So it can be stored in a standard integer type, such as `unsigned long int`

---

### 🧠 Example Use Case

Let’s say we are building an `ImageUploader` application:

-   A user uploads an image via the website
-   The application server receives the request
-   The server generates a unique ID for the uploaded image
-   The image metadata (including the ID) is then stored in the database

![[_assets/ID Generate Strategies - Architecture 1.png]]

---

**Let’s explore some approaches!**

Here, we’ll look at two ways to generate a unique ID:

-   🔢 Using counter variable
-   ⏰ Using timestamp

# 🔢 Using a counter variable

### 💡Solution #1.1

Generate a unique integer using a counter variable.

```cpp
unsigned long counter = 0;
unsigned long getId()
{
    return counter++;
}
```

🚩 **Issues with this solution**
If multiple threads execute this function simultaneously, it will cause conflicts (e.g., duplicate IDs).

### 💡Solution #1.2

Since multiple threads executing the function simultaneously could cause conflicts, we need to synchronize the critical section to ensure that only one thread can execute it at a time, while others wait until the current thread finishes.

```cpp
unsigned long counter = 0;
unsigned long getId()
{
    lock(obj)
    {
        counter++;
    }
    return counter;
}
```

🚩 **Issues with this solution**
If the application or system crashes and restarts, the `counter` variable will reset to zero, potentially causing conflicts.

### 💡Solution #1.3

Since the `counter` variable resets to zero when the application or system crashes and restarts, we need to persist its value so that it can resume from where it left off.

```cpp
unsigned long counter = load();
unsigned long getId()
{
    lock(obj)
    {
        counter++;
        save_counter();
    }
    return counter;
}
```

🚩 **Issues with this solution**
Saving the counter value on each function execution adds some delay, as writing to disk is slower than writing to memory (RAM). Can we improve this?

### 💡Solution #1.4

Saving the counter on every function call adds overhead, so we should buffer the operation. For example, instead of saving it each time, we can persist the value every 1,000 executions.

```cpp
unsigned long counter = load();
unsigned long getId()
{
    lock(obj)
    {
        counter++;
        if (counter % 1000 == 0)
        {
            save_counter();
        }
    }
    return counter;
}
```

🚩 **Issues with this solution**
If the application or system crashes before the counter is saved, it will restart from the last saved value. For example, if the counter was last saved at 1000 and the crash occurs during the 1999th ID generation, it will restart from 1000 instead of 1999, leading to potential ID conflicts.

### 💡Solution #1.5 (Final Solution)

If a crash occurs before the counter is persisted, the system will fall back to the last saved value. For instance, if the counter was saved at 1000 and the crash happens at ID 1999, the system will restart from 1000, leading to possible ID duplication. To mitigate this, we can apply a buffer when loading the counter—e.g., resume from saved value + buffer—to ensure no overlap in case of crashes.

```cpp
unsigned long counter = load() + 1000;
unsigned long getId()
{
    lock(obj)
    {
        counter++;
        if (counter % 1000 == 0)
        {
            save_counter();
        }
    }
    return counter;
}
```

#### Why **1000**?

If we choose a very large number when preloading the counter, there's a high risk of wasting a large range of IDs in case of an application crash. For example:

```cpp
unsigned long counter = load() + 1000000;
unsigned long getId()
{
    lock(obj)
    {
        counter++;
        if (counter % 1000000 == 0)
        {
            save_counter();
        }
    }
    return counter;
}
```

Let’s say the last saved value was `1,000,000`. Now, right after generating the first new ID (`1,000,001`), the application crashes. Since we save only after every 1,000,000 IDs, the counter was **never persisted again**. After a restart, the system loads `1,000,000` from storage and adds `1,000,000` again — jumping to `2,000,000`.

As a result, the entire range from `1,000,001` to `1,999,999` (i.e., **999,999 IDs**) is **lost or skipped unnecessarily**.

That’s why we must choose an **optimal preload value** — not too small (which would increase I/O overhead from frequent disk writes), and not too large (which increases the risk of wasted IDs).

### ✏️ Let’s do a quick back-of-the-envelope calculation

Since an **unsigned long** is 64 bits, it can generate values from:  
**0 to 18,446,744,073,709,551,615** (≈ **18.4 quintillion**)

To put that into perspective, here’s how long it would take to overflow if you generate IDs at different speeds:

-   🚀 **1 million IDs/second** ≈ **292,000 years** to overflow
-   ⚡ **1 billion IDs/second** ≈ **292 years**

# ⏰ Using timestamp

**Epoch Time**
It represents the number of seconds (or milliseconds) that have passed since a fixed point in time, called the Unix Epoch.

**📅 The Unix Epoch**

-   Defined as: **00:00:00 UTC on January 1, 1970**
-   So, **epoch time = current time − Jan 1, 1970**

**For example:**

-   `0` = Jan 1, 1970
-   `1,000,000` = ~11 days after
-   `1,725,000,000` = Tue, Jul 16, 2024 (in seconds)

**🔧 How to Customize Epoch Time**

We might want to define a **custom epoch** — for example, starting from Jan 1, 2020, instead of 1970 — to reduce the size of the epoch time.

Suppose we are launching a new application. If we generate IDs using the standard epoch (starting from 1970), all timestamps will be based on the current time since 1970. **As a result, a large range of smaller values (earlier timestamps) will be unused — essentially wasted.** By starting from a recent custom epoch (e.g., the app launch date), we can make better use of the available number space.

**_Since our constraint is to fit the ID within 64 bits, starting from a smaller number allows us to generate more unique IDs without wasting a large portion of the available number space._**

---

### 💡Solution #2.1

`get_epoch_ms()` returns an integer (epoch time) representing the milliseconds elapsed since January 1, 2025 UTC (the Unix epoch).

For example, if the current timestamp is **July 19, 2025, 12:00:00 UTC**, `get_epoch_ms()` would return approximately **1,752,926,400,000** milliseconds.

```cpp
unsigned long getId()
{
    return get_epoch_ms();
}
```

🚩 **Issues with this solution**
If multiple threads execute this function simultaneously, it will cause conflicts (e.g., duplicate IDs).

### 💡Solution #2.2

Since multiple threads executing the function simultaneously could cause conflicts, we need to synchronize the critical section to ensure that only one thread can execute it at a time, while others wait until the current thread finishes.

```cpp
unsigned long getId()
{
    lock(obj)
    {
        return get_epoch_ms();
    }
}
```

🚩 **Issues with this solution**
While synchronization resolves most conflict issues, it's still possible for two threads to get the same value if they execute within the **same millisecond**, since milliseconds aren't precise enough for high-concurrency scenarios.

### 💡Solution #2.3

While synchronization resolves most conflict issues, it's still possible for two threads to get the same value if they execute within the **same millisecond**, since milliseconds aren't precise enough for high-concurrency scenarios. To mitigate this, we can introduce a counter that increments if multiple threads execute within the same millisecond. By **concatenating** this counter with the epoch time, we can avoid ID conflicts.

```cpp
Type counter = 0;
Type lastEpoch = 0;
Type getId()
{
    lock(obj)
    {
        Type curEpoch = get_epoch_ms();
        if (curEpoch == lastEpoch)
        {
            counter++;
        }
        lastEpoch = curEpoch;
    }
    return concat(curEpoch, counter);
}
```

📌**Note**

-   `Type` is a user-defined data type.
-   `concat` is a user-defined function that performs bitwise concatenation of `epoch time` and `counter`.

Since our ID must fit within 64 bits, we can allocate **56 bits** to the epoch time and **8 bits** to the counter for concatenation.

<div style="text-align: center;">
  <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Right aligned" />
</div>

✏️ Let’s do a quick back-of-the-envelope calculation

-   **56 bits** can represent numbers up to about **72,057,594,037,927,936** (72 quadrillion)
-   **8 bits** can represent numbers up to **256**

To put that into perspective, here’s how long it would take to overflow if you generate IDs at different speeds:

-   🚀 **1 million IDs/second** → ≈ **2,283 years** to overflow
-   ⚡ **1 billion IDs/second** → still takes ≈ **2.28 years**

🚩 **Issues with this solution**
Since the counter uses only **8 bits**, it can hold values from `0 to 255`. In high-concurrency scenarios, multiple threads may invoke the function within the same millisecond. Over time, this can cause the counter to **overflow**, resulting in **corrupted values** being combined with the epoch timestamp, potentially leading to **ID collisions** or **invalid IDs**.

### 💡Solution #2.4

In high-concurrency scenarios, multiple threads may invoke the function within the same millisecond. Over time, this can cause the counter to **overflow**. To address this, resetting the counter when the millisecond changes prevents the overflow issue.

```cpp
Type counter = 0;
Type lastEpoch = 0;
Type getId()
{
    lock(obj)
    {
        Type curEpoch = get_epoch_ms();
        if (curEpoch == lastEpoch)
        {
            counter++;
        }
        else
        {
            counter = 0;
            lastEpoch = curEpoch;
        }
    }
    return concat(curEpoch, counter);
}
```

🚩 **Issues with this solution**
Suppose, a machine with **256 or more threads** executing concurrently, it's possible for multiple threads to call the function within the same millisecond. This would **exceed the counter limit**, potentially causing **ID collisions** or **invalid IDs**.

### 💡Solution #2.5 (Final Solution)

If a machine with **256 or more threads** executing concurrently, it's possible for multiple threads to call the function within the same millisecond. This would **exceed the counter limit**, potentially causing **ID collisions** or **invalid IDs**. To address this, when the counter reaches its maximum value, we should wait until the next millisecond before generating more IDs. By doing this, we can avoid collisions effectively.

```cpp
Type counter = 0;
Type lastEpoch = 0;
Type getId()
{
    lock(obj)
    {
        Type curEpoch = get_epoch_ms();
        if (curEpoch == lastEpoch)
        {
            counter++;
            if (counter > MAX_COUNTER)
            {
                // Wait for next millisecond to avoid collision
                while ((curEpoch = get_epoch_ms()) <= lastEpoch);
                counter = 0;
            }
        }
        else
        {
            counter = 0;
            lastEpoch = curEpoch;
        }
    }
    return concat(curEpoch, counter);
}
```

---

Our two proposed solutions work well when running the application on a single machine or instance. However, they fail to prevent collisions in a multi-instance environment because:

-   **Approach #1:** If multiple machines start simultaneously, their counters will start to zero, causing ID collisions.
-   **Approach #2:** If multiple machines generate IDs within the same millisecond, duplicate IDs may be produced due to identical timestamps and counters.

![[_assets/ID Generate Strategies - Architecture 2.png]]

### 💡Solution #3.1

When multiple machines start simultaneously, their counters will begin at zero, which can lead to ID collisions. To address this, we can introduce a **machine ID** that is unique to each machine. By concatenating the machine ID with the counter, we can avoid collisions.

Since our ID must fit within **64 bits**, we can allocate **56 bits** to the counter and **8 bits** to the machine ID.

```cpp
long counter = load() + 1000;
long getId()
{
    lock(obj)
    {
        counter++;
        if (counter % 1000 == 0)
        {
            save_counter();
        }
    }
    return concat(counter, machineID);
}
```

🧩 Challenges

**How do we generate a machine ID that fits within 8 bits?**
One approach is to assign a random 8-bit number (0–255) to each instance during creation. This can be done by generating a random number and saving it to a file that persists across restarts.  
However, since the range is very limited (only 256 values), **collisions are highly likely** if multiple machines are created.

🚩 **Issues with this solution**
The **machine ID space is limited to 8 bits**, which allows only **256 unique values**. Since machine IDs are generated randomly without coordination, **the probability of collision is high**, especially if multiple machines are created.

### 💡Solution #3.2

The counter-based approach from **Solution #3.1** is not viable because machine IDs are assigned randomly, which leads to a **high probability of collision**.  
Therefore, we need to revert to the timestamp-based approach from **Solution #2.5**. However, that approach also has a flaw: when **multiple machines generate IDs within the same millisecond**, **duplicate IDs** can occur due to identical timestamps and counters.

To address this, we can **introduce a machine ID** that is unique to each machine. By **concatenating the epoch time, machine ID, and counter**, we can effectively avoid collisions.

Since the ID must fit within **64 bits**, we can allocate:

-   **44 bits** for the epoch time
-   **12 bits** for the machine ID
-   **8 bits** for the counter

```cpp
Type counter = 0;
Type lastEpoch = 0;
Type getId()
{
    lock(obj)
    {
        Type curEpoch = get_epoch_ms();
        if (curEpoch == lastEpoch)
        {
            counter++;
            if (counter > MAX_COUNTER)
            {
                // Wait for next millisecond to avoid collision
                while ((curEpoch = get_epoch_ms()) <= lastEpoch);
                counter = 0;
            }
        }
        else
        {
            counter = 0;
            lastEpoch = curEpoch;
        }
    }
    return concat(curEpoch, machineID, counter);
}
```

🧩 Challenges

**How do we generate a machine ID that fits within 12 bits?**  
One approach is to assign a random **12-bit number (0–4095)** to each instance during creation. This can be done by generating a random number and saving it to a local file that persists across restarts.

> ⚠️ However, since the machine ID space is limited, **collisions can still occur** if many machines are created.

That said, the risk of a **full ID collision remains low** because:

-   Even if two machines share the same machine ID, their **epoch time** will likely differ.
-   Even if the epoch time also matches, the **counter value** helps distinguish between IDs.

So, while machine ID collisions are possible, the combined uniqueness of **epoch + machine ID + counter** makes actual ID duplication **extremely unlikely**.

Since our ID must fit within 64 bits, we can allocate **44 bits** for the epoch time and **12 bits** for the machine ID and **8 bits** for the counter for concatenation.

```
|------------------------------------------------------------|
|                             64 bits                        |
|------------------------------------------------------------|
|      44 bits       |      12 bits       |      8 bits      |
|--------------------|--------------------|------------------|
|     Epoch Time     |     Machine ID     |      Counter     |
|--------------------|--------------------|------------------|
```

✏️ Let’s do a quick back-of-the-envelope calculation:

-   **44 bits** can represent numbers up to **17,592,186,044,416** (~17.59 trillion)
-   **12 bits** can represent numbers up to **4,096**
-   **8 bits** can represent numbers up to **256**

To put that into perspective, here’s how long it would take to overflow the **44-bit epoch time** field if you generate IDs at different speeds:

-   🚀 **1 million IDs/second** → 17,592,186 seconds ≈ **203.6 days**
-   ⚡ **1 billion IDs/second** → 17,592 seconds ≈ **4.88 hours**
