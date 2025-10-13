<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import {
		getPublishedPosts,
		getPostsByCategory,
		getAllTags,
		blogCategories,
		type BlogPost
	} from '$lib/data/blog-data';

	let posts = $state<BlogPost[]>([]);
	let filteredPosts = $state<BlogPost[]>([]);
	let selectedCategory = $state<string | null>(null);
	let selectedTag = $state<string | null>(null);
	let searchQuery = $state('');
	let allTags = $state<string[]>([]);

	onMount(() => {
		posts = getPublishedPosts();
		filteredPosts = posts;
		allTags = getAllTags();
	});

	// Filtrer les posts
	$effect(() => {
		let filtered = posts;

		if (selectedCategory) {
			filtered = getPostsByCategory(selectedCategory);
		}

		if (selectedTag) {
			filtered = filtered.filter((post) => post.tags.includes(selectedTag));
		}

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(post) =>
					post.title.toLowerCase().includes(query) ||
					post.excerpt.toLowerCase().includes(query) ||
					post.tags.some((tag) => tag.toLowerCase().includes(query))
			);
		}

		filteredPosts = filtered;
	});

	function clearFilters() {
		selectedCategory = null;
		selectedTag = null;
		searchQuery = '';
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('fr-CA', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getCategoryName(categoryId: string): string {
		return blogCategories.find((c) => c.id === categoryId)?.name || categoryId;
	}
</script>

<div class="blog-page">
	<div class="container">
		<!-- Header -->
		<header class="page-header">
			<h1 class="page-title">{$t('blog.title')}</h1>
			<p class="page-subtitle">{$t('blog.subtitle')}</p>

			<!-- Admin link -->
			<div class="admin-link">
				<a href="/blog/admin" class="btn-admin">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path
							d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
						></path>
						<circle cx="12" cy="12" r="3"></circle>
					</svg>
					{$t('blog.admin')}
				</a>
			</div>
		</header>

		<!-- Filters and Search -->
		<div class="filters-section">
			<!-- Search bar -->
			<div class="search-bar">
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
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.35-4.35"></path>
				</svg>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder={$t('blog.searchPlaceholder')}
					class="search-input"
				/>
			</div>

			<!-- Categories -->
			<div class="filter-group">
				<label class="filter-label">{$t('blog.category')}:</label>
				<div class="filter-buttons">
					<button
						class="filter-btn"
						class:active={selectedCategory === null}
						onclick={() => (selectedCategory = null)}
					>
						{$t('blog.allCategories')}
					</button>
					{#each blogCategories as category}
						<button
							class="filter-btn"
							class:active={selectedCategory === category.id}
							onclick={() => (selectedCategory = category.id)}
						>
							{category.name}
						</button>
					{/each}
				</div>
			</div>

			<!-- Tags -->
			{#if allTags.length > 0}
				<div class="filter-group">
					<label class="filter-label">{$t('blog.tags')}:</label>
					<div class="tags-list">
						<button
							class="tag-btn"
							class:active={selectedTag === null}
							onclick={() => (selectedTag = null)}
						>
							{$t('blog.allTags')}
						</button>
						{#each allTags as tag}
							<button
								class="tag-btn"
								class:active={selectedTag === tag}
								onclick={() => (selectedTag = tag)}
							>
								#{tag}
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Active filters -->
			{#if selectedCategory || selectedTag || searchQuery}
				<div class="active-filters">
					<span>{$t('blog.activeFilters')}:</span>
					{#if searchQuery}
						<span class="filter-chip">
							"{searchQuery}"
							<button onclick={() => (searchQuery = '')} class="remove-filter">×</button>
						</span>
					{/if}
					{#if selectedCategory}
						<span class="filter-chip">
							{getCategoryName(selectedCategory)}
							<button onclick={() => (selectedCategory = null)} class="remove-filter">×</button>
						</span>
					{/if}
					{#if selectedTag}
						<span class="filter-chip">
							#{selectedTag}
							<button onclick={() => (selectedTag = null)} class="remove-filter">×</button>
						</span>
					{/if}
					<button class="clear-filters" onclick={clearFilters}>{$t('blog.clearFilters')}</button>
				</div>
			{/if}
		</div>

		<!-- Posts count -->
		<div class="posts-count">
			{filteredPosts.length}
			{filteredPosts.length === 1 ? $t('blog.article') : $t('blog.articles')}
		</div>

		<!-- Blog posts grid -->
		{#if filteredPosts.length > 0}
			<div class="posts-grid">
				{#each filteredPosts as post}
					<article class="post-card">
						{#if post.image}
							<div class="post-image">
								<img src={post.image} alt={post.title} />
							</div>
						{/if}
						<div class="post-content">
							<div class="post-meta">
								<span class="post-category">{getCategoryName(post.category)}</span>
								<span class="post-date">{formatDate(post.publishedDate)}</span>
							</div>
							<h2 class="post-title">
								<a href="/blog/{post.slug}">{post.title}</a>
							</h2>
							<p class="post-excerpt">{post.excerpt}</p>
							<div class="post-tags">
								{#each post.tags as tag}
									<span class="tag">#{tag}</span>
								{/each}
							</div>
							<a href="/blog/{post.slug}" class="read-more">
								{$t('blog.readMore')} →
							</a>
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<div class="no-posts">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
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
				<p>{$t('blog.noPosts')}</p>
				<button class="btn-secondary" onclick={clearFilters}>{$t('blog.clearFilters')}</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.blog-page {
		min-height: calc(100vh - 8rem);
		padding: 2rem 0;
	}

	.container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.page-header {
		margin-bottom: 3rem;
		position: relative;
	}

	.page-title {
		margin: 0 0 0.5rem 0;
		font-size: 2rem;
		font-weight: 700;
		color: rgb(var(--text-primary));
	}

	.page-subtitle {
		margin: 0;
		font-size: 1rem;
		color: rgb(var(--text-secondary));
	}

	.admin-link {
		position: absolute;
		top: 0;
		right: 0;
	}

	.btn-admin {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: rgb(var(--bg-tertiary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		color: rgb(var(--text-secondary));
		text-decoration: none;
		font-size: 0.875rem;
		transition: all 0.2s ease;
	}

	.btn-admin:hover {
		color: rgb(var(--color-primary));
		border-color: rgb(var(--color-primary));
		background-color: rgb(var(--color-primary) / 0.1);
	}

	.filters-section {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background-color: rgb(var(--bg-secondary));
		border-radius: 0.75rem;
		border: 1px solid rgb(var(--border-color));
	}

	.search-bar {
		position: relative;
		margin-bottom: 1.5rem;
	}

	.search-bar svg {
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		color: rgb(var(--text-muted));
	}

	.search-input {
		width: 100%;
		padding: 0.75rem 1rem 0.75rem 3rem;
		background-color: rgb(var(--bg-primary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		color: rgb(var(--text-primary));
		font-size: 1rem;
		transition: border-color 0.2s ease;
	}

	.search-input:focus {
		outline: none;
		border-color: rgb(var(--color-primary));
		box-shadow: 0 0 0 3px rgb(var(--color-primary) / 0.1);
	}

	.filter-group {
		margin-bottom: 1.5rem;
	}

	.filter-group:last-child {
		margin-bottom: 0;
	}

	.filter-label {
		display: block;
		margin-bottom: 0.75rem;
		font-weight: 500;
		color: rgb(var(--text-primary));
		font-size: 0.875rem;
	}

	.filter-buttons,
	.tags-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.filter-btn,
	.tag-btn {
		padding: 0.5rem 1rem;
		background-color: rgb(var(--bg-primary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		color: rgb(var(--text-secondary));
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.filter-btn:hover,
	.tag-btn:hover {
		color: rgb(var(--color-primary));
		border-color: rgb(var(--color-primary));
	}

	.filter-btn.active,
	.tag-btn.active {
		background-color: rgb(var(--color-primary));
		color: white;
		border-color: rgb(var(--color-primary));
	}

	.active-filters {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid rgb(var(--border-color));
		font-size: 0.875rem;
		color: rgb(var(--text-secondary));
	}

	.filter-chip {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.75rem;
		background-color: rgb(var(--color-primary) / 0.1);
		color: rgb(var(--color-primary));
		border-radius: 1rem;
		font-weight: 500;
	}

	.remove-filter {
		background: none;
		border: none;
		color: rgb(var(--color-primary));
		font-size: 1.25rem;
		cursor: pointer;
		padding: 0;
		line-height: 1;
	}

	.clear-filters {
		padding: 0.25rem 0.75rem;
		background: none;
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.375rem;
		color: rgb(var(--text-secondary));
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.clear-filters:hover {
		color: rgb(var(--color-primary));
		border-color: rgb(var(--color-primary));
	}

	.posts-count {
		margin-bottom: 1.5rem;
		color: rgb(var(--text-secondary));
		font-size: 0.875rem;
	}

	.posts-grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 768px) {
		.posts-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.posts-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.post-card {
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.75rem;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.post-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: rgb(var(--color-primary) / 0.3);
	}

	.post-image {
		width: 100%;
		height: 200px;
		overflow: hidden;
		background-color: rgb(var(--bg-tertiary));
	}

	.post-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.post-content {
		padding: 1.5rem;
	}

	.post-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
		font-size: 0.75rem;
	}

	.post-category {
		padding: 0.25rem 0.5rem;
		background-color: rgb(var(--color-primary) / 0.1);
		color: rgb(var(--color-primary));
		border-radius: 0.25rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.post-date {
		color: rgb(var(--text-muted));
	}

	.post-title {
		margin: 0 0 0.75rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1.3;
	}

	.post-title a {
		color: rgb(var(--text-primary));
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.post-title a:hover {
		color: rgb(var(--color-primary));
	}

	.post-excerpt {
		margin: 0 0 1rem 0;
		color: rgb(var(--text-secondary));
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.tag {
		font-size: 0.75rem;
		color: rgb(var(--text-muted));
	}

	.read-more {
		display: inline-flex;
		align-items: center;
		color: rgb(var(--color-primary));
		text-decoration: none;
		font-weight: 600;
		font-size: 0.875rem;
		transition: gap 0.2s ease;
	}

	.read-more:hover {
		gap: 0.5rem;
	}

	.no-posts {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		text-align: center;
	}

	.no-posts svg {
		margin-bottom: 1rem;
		color: rgb(var(--text-muted));
	}

	.no-posts p {
		margin: 0 0 1.5rem 0;
		color: rgb(var(--text-secondary));
		font-size: 1.125rem;
	}

	.btn-secondary {
		padding: 0.75rem 1.5rem;
		background-color: rgb(var(--bg-tertiary));
		color: rgb(var(--text-primary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-secondary:hover {
		background-color: rgb(var(--bg-secondary));
		border-color: rgb(var(--color-primary));
	}
</style>
