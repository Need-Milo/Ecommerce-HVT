import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Facebook, Github, Linkedin, Youtube } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const socialMedia = [
  {
  title: "Youtube",
  href: "#",
  icon: <Youtube className='w-5 h-5'/>
},{
  title: "Github",
  href: "#",
  icon: <Github className='w-5 h-5'/>
},{
  title: "Linkedin",
  href: "#",
  icon: <Linkedin className='w-5 h-5'/>
},{
  title: "Facebook",
  href: "#",
  icon: <Facebook className='w-5 h-5'/>
},
];

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const SocialMedia = ({className, iconClassName, tooltipClassName}:Props  ) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className  )}  >      
      {socialMedia?.map((item) => (
        <Tooltip key={item?.title}  >
          <TooltipTrigger asChild >
            <Link 
            key={item?.title}
             href={item?.href} 
             
             target='_blank'
             rel='noopener noreferrer'
             className={cn("p-2 border rounded-full hover:text-white hover:border-shop-light-green hoverEffect ", iconClassName)}
             >
              {item?.icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent className={cn("bg-white text-darkColor font-semibold ",tooltipClassName )} >
            {item?.title}
          </TooltipContent>

        </Tooltip>
      ) )}
      </div>
    </TooltipProvider>
  )
}

export default SocialMedia