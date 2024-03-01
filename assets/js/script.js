const allBtn = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const btns = data.data
    getBtn(btns);
}

const getBtn = (btns) => {
    const btnContiner = document.getElementById('btn_container');
    for(const btn of btns){
        const button = document.createElement('button');
        button.className = 'btn rounded-none text-lg font-semibold text-white bg-indigo-400 px-5 py-2';
        button.innerText = btn.category;
        btnContiner.appendChild(button);
    }

}

allBtn()