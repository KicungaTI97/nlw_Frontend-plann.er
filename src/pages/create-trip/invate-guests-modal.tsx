import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"


interface InviteGuestModalProps{
    closeGuestsModal: () => void
    emailsToInvite: string[] 
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
    removeEmailFromInvites: (email: string) => void
}
export function InviteGuestsModal(
    {
        emailsToInvite,
        closeGuestsModal,
        addNewEmailToInvite,
        removeEmailFromInvites,
    }: InviteGuestModalProps){
    return(
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center '>
      <div className='w-[460px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
       <div className='space-y-2'>
         <div className='flex items-center justify-between'>
         <h1 className='text-lg font-semibold'>Selecionar convidados</h1>

        <Button onClick={closeGuestsModal} variant="secondary">
           <X className='size-5 text-zinc-400'/>
        </Button>

         </div>
         <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para participação na viagem.</p>
       </div>
       <div className='flex flex-wrap gap-2'>
         {emailsToInvite.map(email => {
           return(
           <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
           <span className='text-zinc-300'>{email}</span>
    
           <Button variant="secondary" onClick={() => {removeEmailFromInvites(email)}}>
           <X className='size-5 text-zinc-400'/>
           </Button>
         </div>
        
           )
         })}
         
       </div>

       <div className='w-full h-px bg-zinc-800'>
         <form onSubmit={addNewEmailToInvite} className='p-2 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
        <div className='px-2 flex items-center flex-1 gap-2'>
        <AtSign className='text-zinc-400 size-5 '/>
        <input 
         type="email"
         name='email'
         placeholder='Digite o e-mail do convidado' className="bg-transparent text-lg placeholder-zinc-400 outline-none"
       />
        </div>

       <Button type="submit" variant="primary">
        Convidar
       <Plus className='size-5'/>
       </Button>
         </form>
       </div>
     </div>
   
   </div>
 )
  
}