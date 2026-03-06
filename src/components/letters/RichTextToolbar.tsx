import { Editor } from '@tiptap/react';
import { 
  Bold, Italic, Underline, Strikethrough, 
  List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Undo, Redo,
  Heading1, Heading2, Heading3
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RichTextToolbarProps {
  editor: Editor;
  exclude?: string[];
}

export const RichTextToolbar = ({ editor, exclude = [] }: RichTextToolbarProps) => {
  const btnClass = "h-8 w-8 p-0 text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-muted";

  const tools = [
    { icon: Heading1, label: 'Heading 1', pressed: editor.isActive('heading', { level: 1 }), action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { icon: Heading2, label: 'Heading 2', pressed: editor.isActive('heading', { level: 2 }), action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { icon: Heading3, label: 'Heading 3', pressed: editor.isActive('heading', { level: 3 }), action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    'separator',
    { icon: Bold, label: 'Bold', pressed: editor.isActive('bold'), action: () => editor.chain().focus().toggleBold().run() },
    { icon: Italic, label: 'Italic', pressed: editor.isActive('italic'), action: () => editor.chain().focus().toggleItalic().run() },
    { icon: Underline, label: 'Underline', pressed: editor.isActive('underline'), action: () => editor.chain().focus().toggleUnderline().run() },
    { icon: Strikethrough, label: 'Strikethrough', pressed: editor.isActive('strike'), action: () => editor.chain().focus().toggleStrike().run() },
    'separator',
    { icon: List, label: 'Bullet list', pressed: editor.isActive('bulletList'), action: () => editor.chain().focus().toggleBulletList().run() },
    { icon: ListOrdered, label: 'Numbered list', pressed: editor.isActive('orderedList'), action: () => editor.chain().focus().toggleOrderedList().run() },
    'separator',
    { icon: AlignLeft, label: 'Align left', pressed: editor.isActive({ textAlign: 'left' }), action: () => editor.chain().focus().setTextAlign('left').run() },
    { icon: AlignCenter, label: 'Align center', pressed: editor.isActive({ textAlign: 'center' }), action: () => editor.chain().focus().setTextAlign('center').run() },
    { icon: AlignRight, label: 'Align right', pressed: editor.isActive({ textAlign: 'right' }), action: () => editor.chain().focus().setTextAlign('right').run() },
    { icon: AlignJustify, label: 'Justify', pressed: editor.isActive({ textAlign: 'justify' }), action: () => editor.chain().focus().setTextAlign('justify').run() },
    'separator',
    { icon: Undo, label: 'Undo', pressed: false, action: () => editor.chain().focus().undo().run(), disabled: !editor.can().undo() },
    { icon: Redo, label: 'Redo', pressed: false, action: () => editor.chain().focus().redo().run(), disabled: !editor.can().redo() },
  ] as const;

  return (
    <div className="flex items-center gap-0.5 flex-wrap">
      <TooltipProvider delayDuration={300}>
        {tools.map((tool, index) => {
          if (tool === 'separator') {
            return <Separator key={`sep-${index}`} orientation="vertical" className="h-6 mx-1" />;
          }
          const Icon = tool.icon;
          return (
            <Tooltip key={tool.label}>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  className={btnClass}
                  pressed={tool.pressed}
                  onPressedChange={tool.action}
                  disabled={'disabled' in tool ? tool.disabled : false}
                >
                  <Icon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">{tool.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
};
