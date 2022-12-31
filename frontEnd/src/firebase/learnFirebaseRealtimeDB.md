1. Config SDK
2. In Firebase Project, Go to "Build => Realtime Database "
3. Edit Rules: Set read and write to enable
4. In tabe Data of Realtime Database:
   - Make a JSON Tree Database / import a JSON file
5. Initial Realtime Database in React and get Database Reference (đường dẫn tham chiếu đến DB)
   const db = getDatabase(app); //root reference
   const productRef = ref(db, "products/" + productId + category) //non-root reference

6. Reference method: Web Ver9/ Web ver8

   a. reference.key() : string
   lấy phần cuối của reference: .../user/1/lasName có refe.key() = lastName
   rootRef.key()=null;

   \*b. reference.parent() : reference
   lấy phần parent location của reference:
   rootRef.parent() = null

   \*c. query.ref() : reference
   lấy reference của query's location

   \*d. root() : reference

   e. child(parenRef,"path") / parentRef.child("path"): reference child(parenRef,"path")
   lấy 1 reference dự vào parenRef và path
   usersRef = ref(db, "users")
   adaRef = usersRef.child("ada")
   adaNameRef = adaRef.child("name")
   adaNameRef.toString() = ".../users/ada/name"

   \*f. endAt ( value : number|string|boolean|null,key ? :string ) : Query - truy vấn dữ liệu
   startAt(), startAfter(), endBefore(), endAt() and equalTo() dùng để chọn điểm bắt đầu và kết thúc truy vấn.

7. Read and Write Data

   <!-- 7.1. Basic Write data: -->

   set(reference)

   - Dùng để lưu dữ liệu mới vào 1 tham chiếu chỉ định. Dữ liệu mới sẽ thay thế và ghi đè toàn bộ dữ liệu cũ trong reference (tham chiếu), kể cả child nodes cũng bị xóa luôn.

   Ex: Thay thế dữ liệu cho db/users/1
   set(ref(db, 'users/' + 1), {
   username: name,
   email: email,
   profile_picture : imageUrl
   });

   <!-- 7.2. Read Data: Đọc dữ liệu liên tục -->

   onValue(reference, callback)
   callback = (snapshot)=>{}

   - Dùng để đọc và quan sát dữ liệu theo reference. Sự kiện này sẽ thực hiện 1 lần khi được gắn vào, và sẽ lặp lại mỗi khi dữ liệu (kể cả child nodes) thay đổi.
   - Hàm callback dc truyền vào 1 snapshot của dữ liệu ngay thời điểm đó (kể cả child nodes). Nếu không có dữ liệu, snapshot.exists() = false và snapshot.val() = null

   Ex:
   onValue(productRef, (snapshot) => {
   if (snapshot.exist()){
   const data = snapshot.val();
   console.log(data)
   }
   // updateStarCount(postElement, data);
   });

   <!-- 7.3 Read Data Once: Đọc dữ liệu 1 lần -->

   get() : return Promise <DataSnapshot>

   - SDK được thiết kế để tương tác với data server kể cả khi app offline hay online
   - Dùng get() để gọi dữ liệu 1 lần, k realtime lặp lại khi value và child node thay đổi
