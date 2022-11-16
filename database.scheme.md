# User

**id**
name
email
password
birthday
genre

---

photo
is_student!
phone_number!
my_class!
my_course!
my_glade!
**timestamps**

# Post

id
user_id
title
content
photo
approved

<!-- Only an API -->
<!-- author -->
<!-- isMine if user_id === myId -> isMine = true -->
<!-- saved -->
<!-- liked -->
<!-- disliked -->
<!-- likes -->
<!-- dislikes -->

**timestamps**

# Post_Reacts

id
user_id
post_id
type (1 liked,2 disliked)

**timestamps**

# Post_Comment

id
user_id
post_id
content

**timestamps**

# Comment_React

id
user_id
comment_id
type (1 liked,2 disliked)

**timestamps**

# Post_Saved

id
user_id
post_id

**timestamps**
