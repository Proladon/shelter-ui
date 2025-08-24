<template>
  <div class="demo-languages">
    <h3>多語言支持</h3>
    <p>支援多種程式語言的語法高亮</p>

    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">選擇語言:</label>
      <select
        v-model="selectedLanguage"
        class="border rounded px-3 py-2 bg-white dark:bg-gray-800"
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="json">JSON</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="cpp">C++</option>
        <option value="sql">SQL</option>
      </select>
    </div>

    <SHCodeEditor
      v-model="codeByLanguage[selectedLanguage as keyof typeof codeByLanguage]"
      :language="selectedLanguage"
      width="400px"
      height="400px"
      theme="vs-dark"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SHCodeEditor from '../index.vue'

const selectedLanguage = ref('javascript')

const codeByLanguage = reactive({
  javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,

  typescript: `interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(user: User): User {
  return {
    ...user,
    id: Math.random()
  };
}`,

  html: `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello World</title>
</head>
<body>
  <h1>歡迎使用 CodeEditor</h1>
  <p>這是一個功能強大的代碼編輯器</p>
</body>
</html>`,

  css: `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}`,

  json: `{
  "name": "shelter-ui",
  "version": "1.0.0",
  "description": "Vue UI Components Library",
  "dependencies": {
    "vue": "^3.0.0",
    "monaco-editor": "^0.52.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build"
  }
}`,

  python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

# 測試
numbers = [3, 6, 8, 10, 1, 2, 1]
print(quick_sort(numbers))`,

  java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // 創建一個簡單的計算器
        Calculator calc = new Calculator();
        System.out.println("2 + 3 = " + calc.add(2, 3));
    }
}

class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public int subtract(int a, int b) {
        return a - b;
    }
}`,

  csharp: `using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            
            var person = new Person("張三", 25);
            person.Greet();
        }
    }
    
    public class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }
        
        public Person(string name, int age)
        {
            Name = name;
            Age = age;
        }
        
        public void Greet()
        {
            Console.WriteLine($"你好，我是 {Name}，今年 {Age} 歲");
        }
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9, 3};
    
    // 排序
    std::sort(numbers.begin(), numbers.end());
    
    // 輸出結果
    std::cout << "排序後的數組: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`,

  sql: `-- 創建用戶表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入測試數據
INSERT INTO users (name, email) VALUES
('張三', 'zhang@example.com'),
('李四', 'li@example.com'),
('王五', 'wang@example.com');

-- 查詢所有用戶
SELECT id, name, email, created_at 
FROM users 
ORDER BY created_at DESC;

-- 查詢特定用戶
SELECT * FROM users 
WHERE email = 'zhang@example.com';`,
})
</script>
