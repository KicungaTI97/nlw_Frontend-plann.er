import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";


interface CreateActivityProps{
    closeCreateActivityModal: () => void
}
export function CreateActivityModal({closeCreateActivityModal}:CreateActivityProps){
    return(
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center '>
            <div className='w-[460px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
             <div className='space-y-2'>
               <div className='flex items-center justify-between'>
               <h1 className='text-lg font-semibold'>Cadastrar actividade</h1>
               <Button onClick={closeCreateActivityModal} variant="secondary">
                    <X className='size-5 text-zinc-400'/>
               </Button>
               </div>
               <p className='text-sm text-zinc-400'>
                Todos os convidados podem visualizar as actividades.
               </p>
             </div>
       
               <form className='space-y-3' >
                   <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                       <Tag className='text-zinc-400 size-5 '/>
                       <input 
                       name='title'
                       placeholder='Qual a actividade?' className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                       />
                   </div>
                   <div className="flex items-center gap-2">
                    <div className='h-14 flex-1 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Calendar className='text-zinc-400 size-5 '/>
                        <input 
                        type="datetime-local"
                        name='occurs_at'
                        placeholder='Data e horário da actividade' 
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 [color-sheme:dark]"
                        />
                    </div>
               
                   </div>
                   
                   <Button variant="primary" size="full">
                        Salvar actividade
                   </Button>
               </form>
             </div>
           </div>
    )
}