import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
    fr: {
        ADD_IMAGE: 'Ajouter une image principale',
        ADD_IMAGES: 'Ajouter des images supplémentaires',
        UPDATE_IMAGE: "Modifier l'image principale",
        DELETE_IMAGE: 'Êtes-vous sûr de vouloir supprimer cette image ?',
    },
    en: {
        ADD_IMAGE: 'Add main image',
        ADD_IMAGES: 'Add additional images',
        UPDATE_IMAGE: 'Update main image',
        DELETE_IMAGE: 'Are you sure you want to delete this image?',
    },
    de: {
        ADD_IMAGE: 'Hauptbild hinzufügen',
        ADD_IMAGES: 'Weitere Bilder hinzufügen',
        UPDATE_IMAGE: 'Hauptbild aktualisieren',
        DELETE_IMAGE: 'Sind Sie sicher, dass Sie dieses Bild löschen möchten?',
    },
    es: {
        ADD_IMAGE: 'Añadir imagen principal',
        ADD_IMAGES: 'Añadir imágenes adicionales',
        UPDATE_IMAGE: 'Actualizar imagen principal',
        DELETE_IMAGE: '¿Seguro que quieres eliminar esta imagen?',
    },
    pt: {
        ADD_IMAGE: 'Adicionar imagem principal',
        ADD_IMAGES: 'Adicionar imagens adicionais',
        UPDATE_IMAGE: 'Atualizar imagem principal',
        DELETE_IMAGE: 'Tens a certeza de que queres eliminar esta imagem?',
    },
    it: {
        ADD_IMAGE: 'Aggiungi immagine principale',
        ADD_IMAGES: 'Aggiungi altre immagini',
        UPDATE_IMAGE: 'Aggiorna immagine principale',
        DELETE_IMAGE: 'Sei sicuro di voler eliminare questa immagine?',
    },
    zh: {
        ADD_IMAGE: '添加主图',
        ADD_IMAGES: '添加更多图片',
        UPDATE_IMAGE: '更新主图',
        DELETE_IMAGE: '确定要删除此图片吗？',
    },
    ja: {
        ADD_IMAGE: 'メイン画像を追加',
        ADD_IMAGES: 'その他の画像を追加',
        UPDATE_IMAGE: 'メイン画像を更新',
        DELETE_IMAGE: 'この画像を削除してもよろしいですか？',
    },
})

langHelper.setLanguage(strings)
export { strings }
