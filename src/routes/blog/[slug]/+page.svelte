<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { t } from 'svelte-i18n';
	import { getPostBySlug, blogCategories, type BlogPost } from '$lib/data/blog-data';
	import { marked } from 'marked';

	let post = $state<BlogPost | null>(null);
	let notFound = $state(false);

	onMount(() => {
		const slug = $page.params.slug;
		const foundPost = getPostBySlug(slug);

		if (foundPost && foundPost.published) {
			post = foundPost;
		} else {
			notFound = true;
		}
	});

	function getCategoryName(categoryId: string): string {
		return blogCategories.find((c) => c.id === categoryId)?.name || categoryId;
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('fr-CA', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	const contentHtml = $derived(post ? marked(post.content) : '');
</script>

{#if notFound}
	<!-- Article non trouvé -->
	<div class="not-found">
		<div class="container">
			<div class="not-found-content">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="64"
					height="64"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.35-4.35"></path>
				</svg>
				<h1>Article non trouvé</h1>
				<p>Désolé, cet article n'existe pas ou n'est plus disponible.</p>
				<a href="/blog" class="btn btn-primary">← Retour au blog</a>
			</div>
		</div>
	</div>
{:else if post}
	<!-- Article -->
	<article class="post-page">
		<div class="container">
			<!-- Header de l'article -->
			<header class="post-header">
				<a href="/blog" class="back-link">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="m15 18-6-6 6-6"></path>
					</svg>
					Retour au blog
				</a>

				<div class="post-meta">
					<span class="post-category">{getCategoryName(post.category)}</span>
					<span class="post-date">{formatDate(post.publishedDate)}</span>
					{#if post.updatedDate}
						<span class="post-updated">Mis à jour le {formatDate(post.updatedDate)}</span>
					{/if}
				</div>

				<h1 class="post-title">{post.title}</h1>

				<p class="post-excerpt">{post.excerpt}</p>

				<div class="post-author">
					<span>Par {post.author}</span>
				</div>

				{#if post.tags && post.tags.length > 0}
					<div class="post-tags">
						{#each post.tags as tag}
							<span class="tag">#{tag}</span>
						{/each}
					</div>
				{/if}
			</header>

			<!-- Image featured (si présente) -->
			{#if post.image}
				<div class="post-featured-image">
					<img src={post.image} alt={post.title} />
				</div>
			{/if}

			<!-- Contenu de l'article -->
			<div class="post-content">
				<div class="markdown-content">
					{@html contentHtml}
				</div>
			</div>

			<!-- Footer de l'article -->
			<footer class="post-footer">
				<a href="/blog" class="btn btn-primary">← Retour au blog</a>
			</footer>
		</div>
	</article>
{:else}
	<!-- Chargement -->
	<div class="loading">
		<div class="container">
			<p>Chargement...</p>
		</div>
	</div>
{/if}

<style>
	/* Not found */
	.not-found {
		min-height: calc(100vh - 8rem);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 0;
	}

	.not-found-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 4rem 2rem;
	}

	.not-found-content svg {
		margin-bottom: 1.5rem;
		color: rgb(var(--text-muted));
	}

	.not-found-content h1 {
		margin: 0 0 1rem 0;
		font-size: 2rem;
		color: rgb(var(--text-primary));
	}

	.not-found-content p {
		margin: 0 0 2rem 0;
		color: rgb(var(--text-secondary));
		font-size: 1.125rem;
	}

	/* Loading */
	.loading {
		min-height: calc(100vh - 8rem);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 0;
	}

	.loading p {
		color: rgb(var(--text-secondary));
		font-size: 1.125rem;
	}

	/* Post page */
	.post-page {
		min-height: calc(100vh - 8rem);
		padding: 2rem 0 4rem 0;
	}

	.container {
		max-width: 56rem;
		margin: 0 auto;
		padding: 0 1rem;
	}

	/* Post header */
	.post-header {
		margin-bottom: 3rem;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 2rem;
		color: rgb(var(--color-primary));
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 600;
		transition: gap 0.2s ease;
	}

	.back-link:hover {
		gap: 0.25rem;
	}

	.post-meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1rem;
		font-size: 0.875rem;
	}

	.post-category {
		padding: 0.375rem 0.75rem;
		background-color: rgb(var(--color-primary) / 0.1);
		color: rgb(var(--color-primary));
		border-radius: 0.375rem;
		font-weight: 600;
		text-transform: uppercase;
		font-size: 0.75rem;
	}

	.post-date,
	.post-updated {
		color: rgb(var(--text-muted));
	}

	.post-title {
		margin: 0 0 1rem 0;
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.2;
		color: rgb(var(--text-primary));
	}

	@media (max-width: 768px) {
		.post-title {
			font-size: 2rem;
		}
	}

	.post-excerpt {
		margin: 0 0 1.5rem 0;
		font-size: 1.25rem;
		line-height: 1.6;
		color: rgb(var(--text-secondary));
	}

	.post-author {
		margin-bottom: 1rem;
		padding: 1rem;
		background-color: rgb(var(--bg-secondary));
		border-left: 3px solid rgb(var(--color-primary));
		border-radius: 0.375rem;
		color: rgb(var(--text-secondary));
		font-size: 0.875rem;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.tag {
		padding: 0.375rem 0.75rem;
		background-color: rgb(var(--bg-secondary));
		color: rgb(var(--text-muted));
		border-radius: 0.375rem;
		font-size: 0.875rem;
	}

	/* Featured image */
	.post-featured-image {
		margin-bottom: 3rem;
		border-radius: 0.75rem;
		overflow: hidden;
		box-shadow: var(--shadow-lg);
	}

	.post-featured-image img {
		width: 100%;
		height: auto;
		display: block;
	}

	/* Post content */
	.post-content {
		margin-bottom: 3rem;
	}

	.markdown-content {
		color: rgb(var(--text-primary));
		line-height: 1.8;
		font-size: 1.125rem;
	}

	.markdown-content :global(h1) {
		font-size: 2rem;
		font-weight: 700;
		margin: 2.5rem 0 1rem 0;
		color: rgb(var(--color-primary));
		line-height: 1.3;
	}

	.markdown-content :global(h2) {
		font-size: 1.75rem;
		font-weight: 600;
		margin: 2rem 0 1rem 0;
		color: rgb(var(--text-primary));
		line-height: 1.3;
	}

	.markdown-content :global(h3) {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
		color: rgb(var(--text-primary));
		line-height: 1.3;
	}

	.markdown-content :global(h4) {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.25rem 0 0.5rem 0;
		color: rgb(var(--text-primary));
	}

	.markdown-content :global(p) {
		margin: 0 0 1.5rem 0;
	}

	.markdown-content :global(a) {
		color: rgb(var(--color-primary));
		text-decoration: underline;
		transition: color 0.2s ease;
	}

	.markdown-content :global(a:hover) {
		color: rgb(var(--color-primary-dark));
	}

	.markdown-content :global(ul),
	.markdown-content :global(ol) {
		margin: 0 0 1.5rem 0;
		padding-left: 2rem;
	}

	.markdown-content :global(li) {
		margin-bottom: 0.5rem;
	}

	.markdown-content :global(blockquote) {
		margin: 1.5rem 0;
		padding: 1rem 1.5rem;
		background-color: rgb(var(--bg-secondary));
		border-left: 4px solid rgb(var(--color-primary));
		border-radius: 0.375rem;
		font-style: italic;
		color: rgb(var(--text-secondary));
	}

	.markdown-content :global(code) {
		padding: 0.25rem 0.5rem;
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.25rem;
		font-family: 'Courier New', monospace;
		font-size: 0.9em;
		color: rgb(var(--color-primary));
	}

	.markdown-content :global(pre) {
		margin: 1.5rem 0;
		padding: 1.5rem;
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		overflow-x: auto;
	}

	.markdown-content :global(pre code) {
		padding: 0;
		background: none;
		border: none;
		color: rgb(var(--text-primary));
	}

	.markdown-content :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.5rem;
		margin: 1.5rem 0;
		box-shadow: var(--shadow-md);
	}

	.markdown-content :global(hr) {
		margin: 2rem 0;
		border: none;
		border-top: 2px solid rgb(var(--border-color));
	}

	.markdown-content :global(table) {
		width: 100%;
		margin: 1.5rem 0;
		border-collapse: collapse;
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.markdown-content :global(th),
	.markdown-content :global(td) {
		padding: 0.75rem 1rem;
		border: 1px solid rgb(var(--border-color));
		text-align: left;
	}

	.markdown-content :global(th) {
		background-color: rgb(var(--bg-secondary));
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	/* Post footer */
	.post-footer {
		padding-top: 2rem;
		border-top: 2px solid rgb(var(--border-color));
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.btn-primary {
		background-color: rgb(var(--color-primary));
		color: white;
	}

	.btn-primary:hover {
		background-color: rgb(var(--color-primary-dark));
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}
</style>
