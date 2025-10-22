#!/usr/bin/env python3
import os
import re
import subprocess
import json

# posts 디렉토리 경로
POSTS_DIR = '/Users/yooh/nextjs_blog/posts'

# 모든 .ts 파일 찾기
post_files = [f for f in os.listdir(POSTS_DIR) if f.endswith('.ts')]

print(f"총 {len(post_files)}개의 포스트 파일을 찾았습니다.")

# 각 파일 읽어서 데이터 추출
posts_data = []

for filename in sorted(post_files):
    filepath = os.path.join(POSTS_DIR, filename)

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # title 추출
        title_match = re.search(r"title:\s*['\"](.+?)['\"]", content)
        # category 추출
        category_match = re.search(r"category:\s*['\"](.+?)['\"]", content)

        if title_match and category_match:
            title = title_match.group(1)
            category = category_match.group(1)

            # SQL 이스케이프 (작은따옴표 처리)
            title_escaped = title.replace("'", "''")
            category_escaped = category.replace("'", "''")

            posts_data.append({
                'title': title_escaped,
                'category': category_escaped,
                'filename': filename
            })

    except Exception as e:
        print(f"오류 발생 ({filename}): {e}")

print(f"\n{len(posts_data)}개의 포스트 데이터를 추출했습니다.")

# PostgreSQL에 INSERT
if posts_data:
    # 먼저 기존 데이터 삭제
    clear_cmd = [
        '/opt/podman/bin/podman', 'exec', '3800191f286b',
        'psql', '-U', 'nani', '-d', 'blog', '-c',
        'TRUNCATE TABLE posts RESTART IDENTITY;'
    ]

    result = subprocess.run(clear_cmd, capture_output=True, text=True)
    if result.returncode == 0:
        print("\n기존 데이터를 삭제했습니다.")

    # 데이터 INSERT
    success_count = 0
    for post in posts_data:
        insert_sql = f"INSERT INTO posts (title, category) VALUES ('{post['title']}', '{post['category']}');"

        insert_cmd = [
            '/opt/podman/bin/podman', 'exec', '3800191f286b',
            'psql', '-U', 'nani', '-d', 'blog', '-c',
            insert_sql
        ]

        result = subprocess.run(insert_cmd, capture_output=True, text=True)

        if result.returncode == 0:
            success_count += 1
        else:
            print(f"실패: {post['filename']} - {result.stderr}")

    print(f"\n{success_count}개의 포스트를 데이터베이스에 저장했습니다.")

    # 결과 확인
    count_cmd = [
        '/opt/podman/bin/podman', 'exec', '3800191f286b',
        'psql', '-U', 'nani', '-d', 'blog', '-c',
        'SELECT COUNT(*) FROM posts;'
    ]

    result = subprocess.run(count_cmd, capture_output=True, text=True)
    print(f"\n데이터베이스 확인:\n{result.stdout}")

    # 샘플 데이터 조회
    sample_cmd = [
        '/opt/podman/bin/podman', 'exec', '3800191f286b',
        'psql', '-U', 'nani', '-d', 'blog', '-c',
        'SELECT id, title, category FROM posts ORDER BY id LIMIT 5;'
    ]

    result = subprocess.run(sample_cmd, capture_output=True, text=True)
    print(f"샘플 데이터:\n{result.stdout}")

else:
    print("추출된 데이터가 없습니다.")
