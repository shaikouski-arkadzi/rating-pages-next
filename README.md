## Функции для получения данных для SSR

    // Для статической генерации
    function getStaticProps() {}
    function getStaticPath() {}
    
    // Для SSR
    function getServerSideProps() {}

* Исполняются только на сервере
* Могут быть только на страницах

---

### getStaticProps

Когда использовать?

* Данные для рендера доступны во время сборки
* Для всех пользователей страница выглядит одинаково
* Данные могут быть публично закэшированы
* Страница должна быть доступна для индексирования

---

    import { GetStaticPropsContext, InferGetStaticPropsType, GetStaticProps } from 'next';
    import { ParsedUrlQuery } from 'node:querystring';
    
    function Page({res}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
      return <></>;
    }
    
    export default Page;
    
    export const getStaticProps: GetStaticProps<IPageProps> = async ({params}: <ParsedUrlQuery>) => {
      const res = await fetch();
      return {
        props: {
          res, // res передаются на страницу Page
        },
      };
    };
    
    interface IPageProps {
      res: Response
    }

---

### Дополнительные параметры

    export type GetStaticPropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery> = {
      params?: Q // Параметры роута, если страница вида [id].tsx
      preview?: boolean // Режим превью. Зарендерить страницу с некоторыми данными, но не проводить статическую генерацию
      previewData?: any // Данные для превью
      locale?: string // Данные о языке для мультиязычных сайтов
      locales?: string[] // Все доступные языки
      defaultLocale?: string // Язык по умолчанию
    }

---

### Возвращаемые параметры

    return {
      props: {
        res, // Данные для страницы
      },
      revalidate: 5, // Секунд после которых произойдет перегенерация страницы
      redirect: { // Опция для перенаправления пользователя
        destination: '/',
        permament: false
      },
      notFound: true // Возврат 404 страницы вместо запрашиваемой
    }

---

### getStaticPaths

Получает пути страниц для статической генерации

Когда использовать?

* Для рендера страниц с динамическими адресами
* Для всех пользователей страница выглядит одинаково
* Данные могут быть публично закэшированы
* Страница должна быть доступна для индексирования

---

    export const getStaticPaths: GetStaticPaths = async () => {
      return {
        paths: ['/route1', '/route1'], // Генерация путей
        // paths: [{ params: { id: 'route1' } }], Параметры если их несколько
        fallback: true // Пробовать ли рендерить сраницу, если пути нет среди path
        // 'blocking' - для ожидания рендеринга
      };
    };

---

### getServerSideProps

Выполняет пререндер для каждого запроса

Когда использовать?

Только если надо зарендерить страницу прямов во время запроса, так как страница
будет медленнее статики. Например, для персонализации страниц.

---

    export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {};

---

### Дополнительные параметры

    export type getServerSidePropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery> = {
      req: IncomingMessage & { cookies: NextApiRequestCookies } // Объект запроса к http
      res: ServerResponse // Объект ответа для http
      params?: Q // Параметры роута, если страница вида [id].tsx
      query: ParsedUrlQuery // Query параметры запроса
      preview?: boolean // Режим превью. Зарендерить страницу с некоторыми данными, но не проводить статическую генерацию
      previewData?: any // Данные для превью
      resolvedUrl: string // Нормализованная версия url по которому прошел запрос
      locale?: string // Данные о языке для мультиязычных сайтов
      locales?: string[] // Все доступные языки
      defaultLocale?: string // Язык по умолчанию
    }

---

## Link

    export declare type LinkProps = {
        href: Url; // Путь куда навигировать
        as?: Url; // Путь для отображения в браузере
        replace?: boolean; // Заменяет текущий элемент history
        scroll?: boolean; // Скроллить ли страницу дл верха
        shallow?: boolean; // Запускать ли getServerSideProps, getStaticProps, getStaticPath
        passHref?: boolean; // Прокидывать href до child
        prefetch?: boolean; // Предзагрузка данных страницы
    }

    href={{ // href props as object
        pathname: '/search',
        query: {q:'test'}
    }}

---

## Image

    <Image
        quality={70} // Качество сжатия
        priority={false} // Preload изображения
        src="" // Путь к файлу
        width={} // Ширина изображения
        height={} // Высота изображения
        layout='fixed' // layout
        objectFit='fill' // Ecли layout fill
        objectPosition='left center' // Ecли layout fill
        loading='lazy' // Ленивая загрузка
        unoptimized={false} // Оптимизация изображений
        loader={myLoader} // Кастомный загрузчик изображений
    />

---

## Layout

* **fixed** - если изображение не меняется при адаптиве
* **intrinsic** - для меньших разрешени изображение будет сжиматься
* **responsive** - для меньших разрешени изображение будет сжиматься, а для
  больших растягиваться
* **fill** - будет растягиваться до границ родителя

---

## Кастомный загрузчик

    const myLoader = ({ src, width, quality }: ImageLoaderProps) =>
        `https://example.com/${src}?w=${width}&q=${quality || 75}`;

---

## Настройки размеров

    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        domains: ['example.com'],
    }

---
