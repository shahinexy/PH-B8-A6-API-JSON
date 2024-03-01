const allBtn = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const btns = data.data
    getBtn(btns);
}

const getBtn = (btns) => {
    const btnContiner = document.getElementById('btn_container');
    for (const btn of btns) {
        const button = document.createElement('button');
        button.className = 'btn categori_btn rounded-none text-lg font-semibold text-white bg-indigo-400 px-5 py-2';
        button.innerText = btn.category;
        button.addEventListener('click', () => {
            getBtnID(btn.category_id)
            const btns = document.querySelectorAll('.categori_btn');
            for(const btn of btns){
                btn.classList.remove('bg-indigo-800');
            }
            button.classList.add('bg-indigo-800');
        })
        btnContiner.appendChild(button);
    }

}
const getBtnID = async (id = '1000') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    getVideos(data.data);
}
const isSort = false;
const getVideos = (videos) => {
    if(isSort){
        videos.sort((a,b) => {
            const a = a.videos?.views;
            const b = b.videos?.views;
            const aInNumber = parseFloat(a.replace('K', ''))
            const bInNumber = parseFloat(b.replace('K', ''))
            return aInNumber - bInNumber;
        })
    }
    const videoConatiner = document.getElementById('videos_contaienr');
    videoConatiner.textContent = '';
    const errorMsg = document.getElementById('error_msg');
    if (videos.length === 0) {
        errorMsg.classList.remove('hidden');
    }
    else (
        errorMsg.classList.add('hidden')
    )
    videos.map((video) => {
        verified = '';
        if (video.authors[0].verified) {
            verified = `<img src="assets/images/Group 3.png" alt=""></img>`
        }
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card p-5 shadow-xl md:h-96">
        <div class="flex justify-center">
            <img class=" md:h-52 w-full" src="${video.thumbnail}" alt="">
        </div>
        <div class="flex mt-5">
            <div class="w-1/5 ">
                <img class="rounded-full w-full h-1/2" src="${video.authors[0]?.profile_picture}" alt="">
            </div>
            <div class="w-4/5 ml-4">
                <div class="title">
                    <h3 class="text-xl font-semibold">${video.title}</h3>
                    <p class="flex gap-3 mt-2">${video.authors[0]?.profile_name} ${verified}</p>
                    <p class="text-sm">${video.others?.views} Views</p>
                </div>
            </div>
        </div>
    </div>
        `

        videoConatiner.appendChild(div);
    })
}

allBtn()
window.onload = getBtnID();